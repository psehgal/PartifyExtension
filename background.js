currentSong = "";
playlistId = "";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "get-song":
            getSong();
            break;
        case "login":
        	createPlaylistWithLogin();
        	sendResponse({ msg : playlistId });
        	break;
        case "create-playlist":
        	createPlaylist();
        	break;
        case "track-id":
        	updateTrackId(request.trackId);
        	break;
        break;
    }
    return true;
});

var createPlaylistWithLogin = function() {
	playlistId = makeid();
	var url = "http://partify.herokuapp.com/login/";
	var http = new XMLHttpRequest();
	var fullUrl = url + playlistId;
	chrome.tabs.create( {url : fullUrl} );
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
	injectScript("get_track.js");
	t = setTimeout(function() { getSong() }, 1000);
}

//SHIV this is where the post would happen
//The song parameter is the name of the currently playing song in the playlist
var songChangeAction = function(song){
	chrome.extension.getBackgroundPage().console.log(song);
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