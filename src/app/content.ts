// send message 
chrome.runtime.sendMessage({}, (response) => {
    var checkReady = setInterval(() => {
        if (document.readyState === "complete") {
            clearInterval(checkReady)

            // check if url is from any user entedred blocked sites
            chrome.storage.sync.get("blockedSites", function(result) {
                var val = result.blockedSites;
                var blockedSites = [];
                if (val) {
                    blockedSites = val.split(",");
                } 
                var arrayLength = blockedSites.length;
                for (var i = 0; i < arrayLength; i++) {
                    console.log("Blocked Site " + blockedSites[i] + " - Current URL = "+ window.location.href);

                    if (window.location.href.includes(blockedSites[i])) {
                        //console.clear();
                        console.log(">>>>>>>> Blocking " + blockedSites[i]);
                        document.body.innerHTML = "Sorry this site is blocked by Chrome :-(";
                    }
                              
                }
                
            });
        }
    })
})
