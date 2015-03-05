currentSong = "";
playlistId = "";
user = "";
accessCode = "";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "get-song":
            getSong();
            break;
        case "login":
        	login();
        	getUser();
        	getSong();
        	break;
        case "get-user":
        	getUser();	
        	break;
        case "create-playlist":
        	createPlaylist();
        	break;
        case "track-id":
        	updateTrackId(request.trackId);
        	break;
        case "refresh-iframe":
        	injectScript("get_collection_iframe_id.js");
        	break
        case "user-id":
        	user = request.user;
        	break;
        case "get-user-id":
        	console.log("user: " + user);
        	var sendBack = "";
        	if (user == "") {
        		sendBack = "Login to continue. Navigate to playlist for an access code.";
        	} else {
        		sendBack = accessCode;
        	}
        	sendResponse({
        		message: sendBack
        	});
        	break;
        break;
    }
    return true;
});


var login = function() {
	var loginUrl = "http://partify.herokuapp.com/login/";
	chrome.tabs.create( {url : loginUrl} );
}

function getUser() {
	if (user == "") {
		injectScript("get_user_name_or_id.js");
		t = setTimeout(function() { getUser() }, 1000);
	} else {
		chrome.extension.sendMessage({
			type: "popup-message",
			message: user
		});
		console.log(user);
	}
}

var login = function() {
	chrome.tabs.create({ url : "http://partify.herokuapp.com/login"});
}

var updateTrackId = function(song) {
	if (song != currentSong) {
		currentSong = song
		chrome.extension.getBackgroundPage().console.log(song);
		injectScript("get_collection_iframe_id.js");
	}
}

var getSong = function() {
	//getUserIdOrName();
	injectScript("get_track.js");
	if (user != "") {
		if (accessCode == "") {
			console.log("getting access code...");
			url = "http://partify.herokuapp.com/api/auth?spotifyId=";
			fullUrl = url + user;
			console.log(fullUrl);
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
    			if (xmlhttp.status == 200 || xmlhttp.status == 304) {
        			var myArr = JSON.parse(xmlhttp.responseText);
        			//myFunction(myArr);
        			for (var key in myArr) {
        				if (myArr.hasOwnProperty(key)) {
        					if (key == "accessCode") {
        						accessCode = myArr[key];
        						console.log(accessCode);
        					}
        				}
        			}
    			}
			}
			xmlhttp.open("GET", fullUrl, true);
			xmlhttp.send();
		}
	}
	t = setTimeout(function() { getSong() }, 1000);
}

function myFunction(myArr) {
	for (var i = 0; i < myArr.length; i++) {
		console.log(myArr[i]);
	}
}

//SHIV this is where the post would happen
//The song parameter is the name of the currently playing song in the playlist
var songChangeAction = function(song){
	chrome.extension.getBackgroundPage().console.log(song);
}

function getUserIdOrName() {
	chrome.tabs.query({url: "*://play.spotify.com/*"}, function(results) {
		for (var i = 0; i < results.length; i++) {
			var re = new RegExp("user/.*/playlist");
			var re2 = new RegExp("/.*/");
			var url = results[i].url;
			var myArray = re.exec(url);
			var result = re2.exec(myArray[0]);
			var userLocal = result[0].replace(/\//g, '');
			user = userLocal;
		}
	})
}

function injectScript(script) {
	chrome.tabs.query({url: "*://play.spotify.com/*"}, function(results) {
		for (var i = 0; i < results.length; i++) {
			var tab_id = results[i].id;
			chrome.tabs.executeScript(tab_id, { file: script});
		}
	});
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}