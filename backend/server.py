from flask import Flask, jsonify, Response, request
from models import User, Report
from flask_cors import cross_origin
from blockchain import connect_blockchain, load_contract
import jwt
import config
from passlib.hash import sha256_crypt
from functools import wraps
from datetime import datetime, timedelta, timezone
import os
from encryption_utils import gen_key, decrypt_file, encrypt_file
import json
from final import extract_info
from cryptography.fernet import Fernet
import base64
from blur import Blur
from text_clean import extract_all


app = Flask(__name__)
jwt_scecret = config.jwt_secret

with open('.key', 'rb') as f:
    key = f.read()

# intialzie salter
cipher = Fernet(key)


def clean_meta(l):
    gg = {}
    for d in l:
        d[0] = d[0].lower().strip().replace('.', '').replace(',', '')
        if d[0] in gg:
            print(d[0].lower())
            gg[d[0]] += 1
        else:
            gg[d[0]] = 1
    return gg
# wrapper function to extract jwt from request


def get_jwt(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        try:
            print(request.headers['authorization'])
            # print(request.data)
            header = request.headers.get('Authorization')
            print(header)
            content = jwt.decode(header.encode(), jwt_scecret)
            return f(content, *args, **kwargs)
        except Exception as e:
            print(e)
            return jsonify(msg=f"Error: {e}"), 404
    return wrap


@app.route('/')
@cross_origin()
def index():
    su = HealthContract.functions.superuser().call()
    return jsonify(msg='api endpoint', superuser=su)


@app.route('/login', methods=['POST', 'GET'])
@cross_origin()
def login():
    content = request.get_json()
    try:
        user = User.objects.get(email=content['email'])
    except Exception as e:
        return jsonify(staus=False, msg=str(e))
    if sha256_crypt.verify(content['password'], user.password):
        token = jwt.encode(
            {'exp':  datetime.utcnow() + timedelta(hours=3),
             'email': user.email}, jwt_scecret)
        response = {'name': user.name, 'address': user.publickey,
                    'join_date': user.join_date, 'jwt': token.decode(), 'id': str(user.id)}
        return jsonify(response)
    else:
        return jsonify(msg='Invalid')


@app.route('/patient/dashboard', methods=['GET', 'POST'])
# @get_jwt
@cross_origin()
def patient_dashboard():
    token = request.form['jwt']
    email = jwt.decode(token, jwt_scecret)['email']
    public_key = User.objects.get(email=email).publickey
    patient_details = HealthContract.functions.patientMapping(
        public_key).call()
    file_ids = HealthContract.functions.viewPersonalFiles(
        public_key).call()
    files = []
    print(file_ids)
    for id in file_ids:
        files.append(HealthContract.functions.viewFile(id).call())
    return jsonify(patient_details=patient_details, files=files)


@app.route('/file/<id>')
@cross_origin()
def file_view(id):
    print(id)
    filex = HealthContract.functions.viewFile(int(id)).call()
    print(filex)
    root = 'datastore/'
    filename = str(filex[0])+'.jpg.enc'
    sec = filex[1]
    sec = cipher.decrypt(base64.b64decode(filex[1]))
    b64 = decrypt_file(sec, root+filename)
    b64 = str(b64)
    b64 = b64[2:-1]
    filex[4] = json.loads(filex[4])
    return jsonify(b64img=b64, filename=filename[:-4], owner=filex[2], summary=filex[4])


@app.route('/meta/<id>')
@cross_origin()
def meta(id):
    email = jwt.decode(id, jwt_scecret)['email']
    user = User.objects.get(email=email)
    reports = Report.objects(user=user.publickey)
    u = {}
    for report in reports:
        for d in report.disease:
            if d in u:
                u[d] += 1
            else:
                u[d] = 1
    meta = {}
    meta['disease'] = u
    u = {}
    for report in reports:
        for d in report.drugs:
            if d in u:
                u[d] += 1
            else:
                u[d] = 1
    meta['drugs'] = u

    return(meta)


@app.route('/file/share', methods=['POST'])
@cross_origin()
def share_file():
    print('res', request.json)
    # email = request.json['email']
    address = request.json['data']
    pat = request.json['address']
    id = request.json['id']
    # print('email', email)
    nonce = web3.eth.getTransactionCount(pat)
    user = User.objects.get(publickey=pat)
    private_key = web3.eth.account.decrypt(user.data, 'Pass@123')
    trxn = HealthContract.functions.shareFile(id, address).buildTransaction({
        'chainId': chain_id,
        'gas': 700000,
        'gasPrice': web3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    singed_trn = web3.eth.account.sign_transaction(
        trxn, private_key=private_key)
    web3.eth.sendRawTransaction(singed_trn.rawTransaction)
    return jsonify(msg=f'Sucessfully shared file with {address}')


@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    r = request.form
    print(request.files)
    f = request.files['image']
    timestamp = int(datetime.now().replace(tzinfo=timezone.utc).timestamp())
    f.filename = str(timestamp) + '.jpg'
    apath = os.path.join('datastore', f.filename)
    f.save(apath)
    token = jwt.decode(r['jwt'], jwt_scecret)
    password = 'Pass@123'
    user = User.objects.get(email=token['email'])
    private_key = web3.eth.account.decrypt(user.data, password)
    print(r['regions'])
    region = json.loads(r['regions'])
    Blur(apath, region)
    info, text = extract_info(apath)
    text = extract_all(text)
    di = clean_meta(info['Disease'])
    dr = clean_meta(info['Drug'])
    Report(data=text, disease=di, drugs=dr, filename=str(
        timestamp), user=user.publickey).save()
    ocr = json.dumps(info)
    print(ocr)

    sec = gen_key()
    encrypt_file(sec.encode(), apath)
    sec = cipher.encrypt(sec.encode())
    sec = base64.b64encode(sec)
    nonce = web3.eth.getTransactionCount(user.publickey)
    trxn = HealthContract.functions.addFile(timestamp, sec, timestamp, user.publickey, ocr).buildTransaction({
        'chainId': chain_id,
        'gas': 700000,
        'gasPrice': web3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    singed_trn = web3.eth.account.sign_transaction(
        trxn, private_key=private_key)
    web3.eth.sendRawTransaction(singed_trn.rawTransaction)
    return jsonify(msg='sucess')


if __name__ == "__main__":
    web3, chain_id = connect_blockchain()
    HealthContract = load_contract(web3)
    app.run(host='0.0.0.0', debug=True)
