loggedInPublicKey = ""


/*responsible for user login*/
function login() {
  identityWindow = window.open(
    "https://identity.bitclout.com/log-in?accessLevelRequest=3",
    null,
    "toolbar=no, width=800, height=1000, top=0, left=0"
  );
}
function handleInit(e) {
  if (!init) {
    init = true;
    iframe = document.getElementById("identity");

    for (const e of pendingRequests) {
      postMessage(e);
    }

    pendingRequests = [];
  }
  respond(e.source, e.data.id, {});
}

function handleLogin(payload) {
  console.log(payload);
  if (identityWindow) {
    identityWindow.close();
    identityWindow = null;
    loggedInPublicKey = payload.publicKeyAdded;

    isTxnSign = "signedTransactionHex" in JSON.parse(window.localStorage.getItem('identity')) //just a way to check if this is user login or post approval window
    if (!isTxnSign) {
      if (typeof loggedInPublicKey !== 'undefined') {
        localStorage.setItem("lastUser", JSON.stringify({ "publicKey": loggedInPublicKey }));
      }
      $.get(`/getUser/?publicKey=${loggedInPublicKey}&`,  // url
        function (data, textStatus, jqXHR) {  // success callback
          console.log("fetching posts...")
          username = data["Profile"]["Username"]
          numOfPostsToFetch = 50//fetching last 50 posts of user
          getUserPosts(loggedInPublicKey, numOfPostsToFetch, username)
        });
    }
    else if (JSON.parse(window.localStorage.getItem('identity'))["signedTransactionHex"]) {
      $.get(`/submit-transaction/?signTxnHash=${JSON.parse(window.localStorage.getItem('identity'))["signedTransactionHex"]}`,
        function (data, textStatus, jqXHR) {
          console.log(data)

        })
    }
  }


}

function respond(e, t, n) {
  e.postMessage(
    {
      id: t,
      service: "identity",
      payload: n,
    },
    "*"
  );
}

function postMessage(e) {
  init
    ? this.iframe.contentWindow.postMessage(e, "*")
    : pendingRequests.push(e);
}

// const childWindow = document.getElementById('identity').contentWindow;
window.addEventListener("message", (message) => {
  console.log("message: ");
  // console.log(message);

  const {
    data: { id: id, method: method, payload: payload },
  } = message;

  console.log(id);
  console.log(method);
  console.log(payload);
  localStorage.setItem("identity", JSON.stringify(payload));

  if (method == "initialize") {
    handleInit(message);
  } else if (method == "login") {
    handleLogin(payload);
  }
});

var init = false;
var iframe = null;
var pendingRequests = [];
var identityWindow = null;


// code below is responsible for making post to bitclout
function makePost() {
  var txt = $("#postBodyForm").val();
  console.log(txt)
  if (txt == "") {
    window.alert("huh ? posting without any text ?")
  }
  else {
    loginData = JSON.parse(window.localStorage.getItem('lastUser'))
    console.log(loginData)
    publicKey = loginData["publicKey"]
    console.log(publicKey)
    body = txt
    imageURL = ""
    $.get(`/submit-post/?publicKey=${publicKey}&body=${body}`,  // url
      function (data, textStatus, jqXHR) {  // success callback
        console.log(data)
        identityWindow = window.open(`https://identity.bitclout.com/approve?tx=${data}`, null,
          "toolbar=no, width=800, height=1000, top=0, left=0")
      });
  }

}