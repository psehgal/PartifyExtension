var iframes = document.getElementsByTagName('iframe');

for (var i = 0; i < iframes.length; i++) {
	var playlistIframeId = "collection-app-spotify";
	var currentIframeId = iframes[i].id;
	if (currentIframeId.indexOf(playlistIframeId) > -1) {
		var iFrameId = currentIframeId;
		console.log(iFrameId);
		iframes[i].src = iframes[i].src;
	}
}

