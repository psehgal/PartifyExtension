
var nowPlayingFrame = document.getElementById("app-player");

function iframeRef(frameRef) {
    return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument
}

var track = iframeRef(nowPlayingFrame).getElementById("track-name");
var trackUrl = track.innerHTML;
var trackId = trackUrl.substring(40, 63);

chrome.extension.sendMessage({
    type: "track-id",
    trackId: trackId
});