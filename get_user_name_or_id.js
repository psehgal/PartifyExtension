var iframes = document.getElementsByTagName('iframe');
var found = false;

for (var i = 0; i < iframes.length; i++) {
	var playlistIframeId = "collection-app-spotify";
	var currentIframeId = iframes[i].id;
	if (currentIframeId.indexOf(playlistIframeId) > -1) {
		var url = document.URL;
		var re = new RegExp("user/.*/playlist");
		var re2 = new RegExp("/.*/");
		var myArray = re.exec(url);
		if (myArray == null) {
			break;
		}
		var result = re2.exec(myArray[0]);
		var user = result[0].replace(/\//g, '');
		if (result == null) {
			break;
		}
		chrome.extension.sendMessage({
    		type: "user-id",
    		user: user
		});
		found = true;
	}
}

if (!found) {
	chrome.extension.sendMessage({
		type: "user-id",
		user: ""
	});
}