from Crypto import Random
from Crypto.Cipher import AES
import os
import string
import os.path
import random
from os import listdir
from os.path import isfile, join
import time
import base64


def encrypt(message, key):
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(key, AES.MODE_CFB, iv)
    return iv + cipher.encrypt(message)


def encrypt_file(key, file_name):
    with open(file_name, 'rb') as fo:
        plaintext = fo.read()
    enc = encrypt(plaintext, key)
    with open(file_name + ".enc", 'wb') as fo:
        fo.write(enc)
    os.remove(file_name)


def decrypt(ciphertext, key):
    iv = ciphertext[:AES.block_size]
    print(key)
    cipher = AES.new(key, AES.MODE_CFB, iv)
    plaintext = cipher.decrypt(ciphertext[AES.block_size:])
    return plaintext.rstrip(b"\0")


def decrypt_file(key, file_name):
    with open(file_name, 'rb') as fo:
        ciphertext = fo.read()
    dec = decrypt(ciphertext, key)
    # print(type(dec))
    return base64.b64encode(dec)


def gen_key():
    key = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase +
                                 string.digits, k=16))
    return key

# encrypt_file(key,'1.jpeg')
# decrypt_file(key,'1.jpeg.enc')
