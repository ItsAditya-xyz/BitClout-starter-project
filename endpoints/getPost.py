import json
import requests

def getPostsOfUser(publicKey, numberOfPosts):
  payload= {"PublicKeyBase58Check":publicKey,"Username":"","ReaderPublicKeyBase58Check":publicKey,"NumToFetch":numberOfPosts}
  #here ReaderPublicKeyBase58Check means the reader of the post. You can leave it as it is or just use your own public key. 
  response = requests.post(url="https://bitclout.com/api/v0/get-posts-for-public-key", json=payload)

  return response.json()
