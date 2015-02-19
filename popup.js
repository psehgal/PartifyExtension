var t;

window.onload = function() {
    // document.getElementById("button").onclick = function {
    //     chrome.extension.sendMessage({
    //         type: "get-song"
    //     });
    // }
    document.getElementById("button").onclick = function() {
    	chrome.extension.sendMessage({
    		type: "get-song"
    	})
    }
}

// while(1) {
// 	setTimeout(function() {
// 		chrome.extension.sendMessage({
// 			type: "get-song"
// 		});
// 	}, 1000);
// }



function timedMessage() {
    chrome.runtime.sendMessage({
    	type: "get-song"
    })
    t = setTimeout(function() { timedMessage(); }, 2000);
}