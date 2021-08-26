import json
import requests

def getPostTransaction(publicKey, body, imageUrl): 

  header = {
        "content-type": "application/json"
    }

  payload= {"UpdaterPublicKeyBase58Check": publicKey,
    "PostHashHexToModify": "",
    "ParentStakeID": "",
    "Title": "",
    "BodyObj": {"Body": body, "ImageURLs": imageUrl},
    "RecloutedPostHashHex": "",
    "PostExtraData": {},
    "Sub": "",
    "IsHidden":  False,
    "MinFeeRateNanosPerKB": 1000}

  res = requests.post(
        "https://bitclout.com/api/v0/submit-post", json=payload, headers=header)

  resJson = res.json()
  transactionHex = resJson["TransactionHex"]
  return transactionHex

def submitTransaction(signedTransactionHex):
    payload= {
        "TransactionHex": signedTransactionHex
    }
    response = requests.post(
        "https://bitclout.com/api/v0/submit-transaction", json=payload)

    return response.status_code