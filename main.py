from re import sub
from flask import Flask, render_template, request
from flask import jsonify
import requests
from requests.models import Response
from werkzeug.wrappers import response
from endpoints.getPost import getPostsOfUser
from endpoints.getUser import getSingleProfile
from endpoints.makePost import submitTransaction, getPostTransaction
app = Flask(__name__)
@app.route('/')

def home():
    return render_template('index.html')

@app.route('/getPost/')
def getPosts():
    publicKey = request.args.get('publicKey')
    count = request.args.get('count')
    response = getPostsOfUser( publicKey, int(count))
    return jsonify(response)

@app.route('/getUser/')
def getUserInformation():
    publicKey = request.args.get('publicKey')
    response = getSingleProfile(publicKey)
    return jsonify(response)

@app.route('/submit-post/')
def createPostTxn():
    publicKey = request.args.get('publicKey')
    body = request.args.get('body')
    imageURL = [] #well, due to complexities of JWT, we won't be having image upload right now. In future we can think about solving this problem
    response = getPostTransaction(publicKey, body, imageURL) #yes, the method takes list of images since multiple images can be uploaded just like twitter
    return response #returning txnHash

@app.route('/submit-transaction/')
def submitTxn():
    signedTxnHash = request.args.get('signTxnHash')
    response = submitTransaction(signedTxnHash)
    return jsonify({"status": response}) #returning status code of the signedTxn

if __name__ == "__main__":  # Makes sure this is the main process
	app.run()

