
currentSong = "";
playlistId = "";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "get-song":
            getSong();
        case "login":
        	createPlaylistWithLogin();
        	sendResponse({ msg : playlistId });
        case "create-playlist":
        	createPlaylist();
        break;
    }
    return true;
});

var createPlaylistWithLogin = function() {
	playlistId = makeid();
	var url = "http://localhost:8081/login/";
	var http = new XMLHttpRequest();
	var fullUrl = url + playlistId;
	chrome.tabs.create( {url : fullUrl} );
}

var login = function() {
	chrome.tabs.create({ url : "http://partify.herokuapp.com/login"});
}

var getSong = function() {
	chrome.tabs.query({url: "*://play.spotify.com/*"}, function(results) {
		//chrome.browserAction.setBadgeText({text: (results.length).toString()});
		for (var i = 0; i < results.length; i++) {
			//chrome.extension.getBackgroundPage().console.log(results[i].title);
			songChange(results[i].title);
		}
	});
	t = setTimeout(function() { getSong() }, 1000);
}

//Registers if there is a new song playling in the playlist. If so, perform the designated songChangeAction
var songChange = function(song){
	if(song != currentSong){
		currentSong = song;
		chrome.extension.getBackgroundPage().console.log(song);
	}
}

//SHIV this is where the post would happen
//The song parameter is the name of the currently playing song in the playlist
var songChangeAction = function(song){
	chrome.extension.getBackgroundPage().console.log(song);
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}