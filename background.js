
currentSong = "";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "get-song":
            getSong();
        break;
    }
    return true;
});

var getSong = function() {
	chrome.tabs.query({url: "*://play.spotify.com/*"}, function(results) {
		//chrome.browserAction.setBadgeText({text: (results.length).toString()});
		for (var i = 0; i < results.length; i++) {
			//chrome.extension.getBackgroundPage().console.log(results[i].title);
			songChange(resutls[i].title);
		}
	});
	t = setTimeout(function() { getSong() }, 1000);
}

var songChange = function(song){
	if(song != currentSong){
		currentSong = song;
		chrome.extension.getBackgroundPage().console.log(song);
	}
}