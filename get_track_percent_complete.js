var nowPlayingFrame = document.getElementById("app-player");

function iframeRef(frameRef) {
    return frameRef.contentWindow ? frameRef.contentWindow.document : frameRef.contentDocument
}

var trackCurrent = (iframeRef(nowPlayingFrame).getElementById("track-current")).innerText;
var trackLength  = (iframeRef(nowPlayingFrame).getElementById("track-length")).innerText;

function hmsToSeconds(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

var secondsCurrent = hmsToSeconds(trackCurrent);
var secondsLength  = hmsToSeconds(trackLength);

var percentComplete = Math.round(secondsCurrent * 100.0 / secondsLength) / 100;

chrome.extension.sendMessage({
    type: "percent-complete",
    percentComplete: percentComplete
});