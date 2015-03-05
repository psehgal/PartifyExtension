message = "Login to continue"

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "popup-message":
            getSong();
            renderMessage(request.message);
            break;
        break;
    }
    return true;
});


window.onload = function() {
	chrome.extension.sendMessage({
		type: "get-user-id"
	}, function(response) {
		var myMessage = response.message;
		renderMessage(myMessage);
	});
    document.getElementById("song_button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "get-song"
    	});
    }
    document.getElementById("login_button").onclick = function() {
    	message = "Navigate to playlist for access token";  	    	
    	chrome.extension.sendMessage({
    		type: "login"
    	});
    	chrome.extension.sendMessage({
    		type: "get-user"
    	});
    }
    document.getElementById("refresh_button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "refresh-iframe"
    	})
    }
    document.getElementById("username_button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "get-user"
    	})
    }
}

function renderMessage(message) {
	document.getElementById("message").textContent = message;
}

document.addEventListener('DOMContentLoaded', function () {
	renderMessage(message);
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});