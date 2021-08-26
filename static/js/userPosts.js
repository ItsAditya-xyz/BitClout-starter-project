
/* for readability this file can be minified*/

function getUserPosts(publicKey, count, username) {
    $.get(`/getPost/?publicKey=${publicKey}&count=${count}`,  // url
        function (data, textStatus, jqXHR) {  // success callback
            postList = data.Posts;
            numberOfPost = postList.length;
            postBox = document.getElementById("postBox");
            finalPostsBody = ""
            for (var i = 0; i < numberOfPost; i++) {
                postBody = postList[i]["Body"]
                isReclout = postList[i]["RecloutedPostEntryResponse"]
                bodyImage = postList[i]["ImageURLs"]
                if (isReclout == null) {
                    if (bodyImage || !bodyImage) {
                        finalPostsBody += ` <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-6">
                        <div class="bg-white comment-section">
                            <div class="d-flex flex-row user p-2 profileContainer">
                                <img class="rounded-circle profilePic" src="https://bitclout.com/api/v0/get-single-profile-picture/${publicKey}?fallback=https://bitclout.com/assets/img/default_profile_pic.png" >
                                <div class="d-flex flex-column ml-2"><span class="name font-weight-bold">${username}</span></div>
                            </div>
                            <div class="mt-2 p-2">
                                <p class="comment-content">${postBody}</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>`
                    }
                    else {
                        finalPostsBody += `          <div class="container mt-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-6">
                                <div class="bg-white comment-section">
                                    <div class="d-flex flex-row user p-2 profileContainer">
                                        <img class="rounded-circle profilePic" src="https://bitclout.com/api/v0/get-single-profile-picture/${publicKey}?fallback=https://bitclout.com/assets/img/default_profile_pic.png">
                                        <div class="d-flex flex-column ml-2"><span class="name font-weight-bold">${username}</span></div>
                                    </div>
                                    <div class="mt-2 p-2">
                                        <p class="comment-content">${postBody}</p>
                                        <img class = "bodyImage" src = "${bodyImage[0]}">
                                    </div>
                            </div>
                        </div>
                    </div>
                  </div>`
                    }

                }
                else if (isReclout != null) {
                    recloutBody = isReclout["Body"]
                    recloutPublicKey = isReclout["ProfileEntryResponse"]["PublicKeyBase58Check"]
                    recloutUsername = isReclout["ProfileEntryResponse"]["Username"]
                    finalPostsBody += ` <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-6">
                        <div class="bg-white comment-section">
                            <div class="d-flex flex-row user p-2 profileContainer">
                                <img class="rounded-circle profilePic" src="https://bitclout.com/api/v0/get-single-profile-picture/${publicKey}?fallback=https://bitclout.com/assets/img/default_profile_pic.png">
                                <div class="d-flex flex-column ml-2"><span class="name font-weight-bold">${username}</span></div>
                            </div>
                            <div class="mt-2 p-2">
                                <p class="comment-content">${postBody}</p>
                            </div>
    
                            <div class="container mt-4 recloutContainer">
                                <div class="d-flex justify-content-center row">
                                    <div class="col-md-6">
                                        <div class="bg-white reclout-section">
                                            <div class="d-flex flex-row user p-2 profileContainer">
                                                <img class="rounded-circle profilePic" src="https://bitclout.com/api/v0/get-single-profile-picture/${recloutPublicKey}?fallback=https://bitclout.com/assets/img/default_profile_pic.png">
                                                <div class="d-flex flex-column ml-2"><span class="name font-weight-bold">${recloutUsername}</span></div>
                                            </div>
                                            <div class="mt-2 p-2">
                                                <p class="comment-content">${recloutBody}</p>
                                            </div>
                    
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>`
                }

            }
            postBox.innerHTML = finalPostsBody
        });
}


function getUserInfo(publicKey) {
    $.get(`/getUser/?publicKey=${publicKey}&`,  // url
        function (data, textStatus, jqXHR) {  // success callback
            return data
        });

}