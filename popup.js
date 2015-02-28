window.onload = function() {
    document.getElementById("song_button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "get-song"
    	});
    }
    document.getElementById("login_button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "login"
    	}, function(response) {
    		renderAccessToken(response.msg);
    	});
		renderAccessToken("access token");
    }
    document.getElementById("playlist_button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "create-playlist"
    	})
    }
}

function renderAccessToken(stringAccessToken) {
	document.getElementById("access_token").textContent = stringAccessToken;
}

document.addEventListener('DOMContentLoaded', function () {
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