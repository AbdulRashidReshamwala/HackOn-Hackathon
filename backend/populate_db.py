from models import User
import config
from blockchain import connect_blockchain, load_contract
from passlib.hash import sha256_crypt

web3, chain_id = connect_blockchain()
HealthContract = load_contract(web3)

patient_privatekeys = ['c64bb770d1e0970f5148c155d3a5dabf6e63f4beaec497c564309566ce2e4834',
                       '54b1ea02e3cadb3445e6b3c5a8a335b3ad41c7e3b97d0d6c36055508d84d9380', '21dc2e70d07d6c4ce92f73a064a9fffc3e4e5e3a8a56a0193721fa881065111b']
pat_names = ['Ali', 'Ramu', 'Bablu']

# for i, key in enumerate(patient_privatekeys):
#     password = 'Pass@123'
#     account = web3.eth.account.encrypt(key, password)
#     password = sha256_crypt.hash(password)
#     pub_key = web3.toChecksumAddress(account['address'])
#     User(name=pat_names[i], email=f'pat{i}@pat.com', password=password,
#          data=account, publickey=pub_key, type='patient').save()
#     nonce = web3.eth.getTransactionCount(pub_key)
#     trxn = HealthContract.functions.addPatient(pat_names[i], 'aadhar_number').buildTransaction({
#         'chainId': chain_id,
#         'gas': 700000,
#         'gasPrice': web3.toWei('1', 'gwei'),
#         'nonce': nonce,
#     })
#     singed_trn = web3.eth.account.sign_transaction(trxn, private_key=key)
#     web3.eth.sendRawTransaction(singed_trn.rawTransaction)

doc_privatekeys = ['936b9a4a782b66182e48d7d61ae36942847f06dbc04e9ff39ed6b99b1afeffc7',
                   '28903f4c7b0ad2f22790de3b035c2f8700f815597bf55f490e538e19fb5eea38', '3c055897e9045855e8a4e9631913504beedf445bc67116c79971dd203326507b']
doc_names = ['Abdul', 'Ubaid', 'Saad']

for i, key in enumerate(doc_privatekeys):
    password = 'Pass@123'
    account = web3.eth.account.encrypt(key, password)
    password = sha256_crypt.hash(password)
    pub_key = web3.toChecksumAddress(account['address'])
    User(name=pat_names[i], email=f'doc{i}@doc.com', password=password,
         data=account, publickey=pub_key, type='doctor').save()
    nonce = web3.eth.getTransactionCount(pub_key)
    trxn = HealthContract.functions.addDoctor(pat_names[i], 'aadhar_number').buildTransaction({
        'chainId': chain_id,
        'gas': 700000,
        'gasPrice': web3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    singed_trn = web3.eth.account.sign_transaction(trxn, private_key=key)
    web3.eth.sendRawTransaction(singed_trn.rawTransaction)
