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
                    var site = blockedSites[i].trim();
                    if (site) {
                        console.log("Blocked Site " + site + " - Current URL = "+ window.location.href);

                        if (window.location.href.includes(site)) {
                            console.clear();
                            console.log(">>>>>>>> Blocking " + site);
                            document.body.innerHTML = "Sorry this site is blocked by Chrome :-(";
                        }

                    }
                }
            });

            if (window.location.href.includes("youtube.com")) {
                console.log(">>> checking channels / words");
                //c2
                chrome.storage.sync.get("blockedChans", function(result) {
                    var val = result.blockedChans;
                    var blockedChans = [];
                    if (val) {
                        blockedChans = val.split(",");
                    } 
                    var arrayLength = blockedChans.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var chan = blockedChans[i].trim();
                        if (chan) {
                            var x = document.getElementsByClassName('ytd-channel-name');
                            var channelName = x[0].firstElementChild.textContent.trim();
                            console.log("Channel from Page - " + channelName);
                            console.log("Channel from settings  - " + chan);
                            if(channelName === chan){
                                document.body.innerHTML = "Sorry this site is not allowed :-(";
                            }
                        }
                    }
                });
                //c3
                chrome.storage.sync.get("blockedWords", function(result){
                    var val = result.blockedWords;
                    var blockedWords = [];
                    if (val) {
                        blockedWords = val.split(",");
                    } 
                    var arrayLength = blockedWords.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var word = blockedWords[i].trim();
                        if (word) {
                            var x = document.getElementsByClassName('ytd-video-primary-info-renderer');
                            var words = x[5].firstElementChild.textContent.trim();
                            console.log("words from Page - " + words);
                            console.log("word from settings  - " + word);
                            if(words.includes(word)){
                                document.body.innerHTML = "Sorry this site is not allowed :-(";
                            }
                        }
                    }
                });
            }


        }
    })
})
