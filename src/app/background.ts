// set default password to admin 
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ url: "Welcome.html" });
    setTimeout(function() {
        chrome.tabs.create({ url: "options.html" });
    }, 2000);
    chrome.storage.sync.set({ "ks_init": "1" }, function () {
        console.log('default password set  ');
    });
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Background got a message!");
    sendResponse({});
});
