import requests
import json

def getSingleProfile(publicKey):
  payload= {"PublicKeyBase58Check":publicKey,"Username":""}
  response = requests.post(url="https://api.bitclout.com/get-single-profile", json=payload)

  return response.json()