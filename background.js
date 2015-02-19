chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "get-song":
            getSong();
        break;
    }
    return true;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {          
	// alert(changeInfo.status);
	// if (changeInfo.status == 'complete') {
	// 	if (tab.url.indexOf("in.yahoo.mail") !== -1) {
	// 	alert(tab.url);
	// 	chrome.tabs.update(tabId, { url: "https://accounts.google.com/ServiceLogin" });
	// 	//injectToTab(tab);
	// 	}
	// }
});

var getSong = function() {
	chrome.tabs.query({url: "*://play.spotify.com/*"}, function(results) {
		//chrome.browserAction.setBadgeText({text: (results.length).toString()});
		for (var i = 0; i < results.length; i++) {
			chrome.extension.getBackgroundPage().console.log(results[i].title);
		}
	});
}