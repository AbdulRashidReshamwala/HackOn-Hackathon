from web3 import Web3
import config
import json


def connect_blockchain():
    web3 = Web3(Web3.HTTPProvider(config.endpoint))
    chain_id = web3.eth.chainId
    return web3, chain_id


def load_contract(web3):
    with open('abi.json') as f:
        abi = json.load(f)
    contract = web3.eth.contract(address=config.contract_address, abi=abi)
    return contract
