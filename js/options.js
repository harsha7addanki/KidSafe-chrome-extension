$( document ).ready(function() {

    $("#login").hide();
    $("#settings").hide();
    $("#initialSetup").hide();

    chrome.storage.sync.get("ks_init", function(o) {
        if (o.ks_init === "1") {
            $("#initialSetup").show();
        } else if (o.ks_init === "0") { 
            $("#login").show();
        }
    });
    
});


$("#login").submit(function(e){
    e.preventDefault();
    chrome.storage.sync.get("password",function(result){
        console.log('button submit - ' + result.password );

        if($("#Password").val() == result.password){
            
            $("#login").hide();
            $("#settings").show();
            
            // load current settings 
            chrome.storage.sync.get("blockedSites", function(result) {
                var val = result.blockedSites;
                var blockedSites = [];
                if (val) {
                    blockedSites = val.split(",");
                } 
                var arrayLength = blockedSites.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (blockedSites[i].trim()) {
                        appendToTable1(blockedSites[i]);
                    }
                }
                
                $('.deleteSite').off('click',handleDeleteSite1);
                $('.deleteSite').on('click',handleDeleteSite1);

            });
            chrome.storage.sync.get("blockedChans", function(result) {
                var val = result.blockedChans;
                var blockedChans = [];
                if (val) {
                    blockedChans = val.split(",");
                } 
                var arrayLength = blockedChans.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (blockedChans[i].trim()) {
                        appendToTable2(blockedChans[i]);
                    }
                }
                
                $('.deleteChans').off('click',handleDelete2);
                $('.deleteChans').on('click',handleDelete2);

            });
            chrome.storage.sync.get("blockedWords", function(result) {
                var val = result.blockedWords;
                var blockedWords = [];
                if (val) {
                    blockedWords = val.split(",");
                } 
                var arrayLength = blockedWords.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (blockedWords[i].trim()) {
                        appendToTable3(blockedWords[i]);
                    }
                }
                
                $('.deleteWord').off('click',handleDelete3);
                $('.deleteWord').on('click',handleDelete3);

            });

        } else {

            window.location.href = window.location.href;

        }
    });
});

$("#updateMasterPassword").click(function(e) {

    e.preventDefault();
    // get value 
    var val = $("#npassword").val();

    // save in storage 
    chrome.storage.sync.set({password : val}, function() {
        chrome.storage.sync.set({"ks_init": "0"});
    });
  
    // hide all other sections
    //$("#initialSetup").hide();
    //$("#login").hide();

    // show only settings section
    //$("#settings").show();

    window.location.href = window.location.href;
});
/**
 * Set1
 */
$("#save").click(function(e) {
    e.preventDefault();
    var site = $("#bsite").val();

    chrome.storage.sync.get("blockedSites", function(result) {
        console.log(' in storage ' + result.blockedSites);

        var blockedSites = [];
        if (result.blockedSites) {
            blockedSites = result.blockedSites.split(",");
        }

        // add to storage
        blockedSites.push(site);

        var actualVal = blockedSites.join();
        console.log(' array to string  ' + actualVal);

        chrome.storage.sync.set({ "blockedSites": actualVal});

        appendToTable1(site);

    });

});

function appendToTable1(siteName) {
    var trVal = `<tr id="${siteName}"><td>${siteName}</td><td><a href="#" class="deleteSite" data-site="${siteName}">&#128465;</a></td></tr>`;
    $('#blockedSites > tbody:last-child').append(trVal);

    $('.deleteSite').off('click',handleDeleteSite1);
    $('.deleteSite').on('click',handleDeleteSite1);
    console.log(siteName);
    console.log(trVal);
}

function handleDeleteSite1(e) {
    e.preventDefault();
    var selectedSite = $(this).data('site');
    console.log(' Selected site ' + selectedSite);

    chrome.storage.sync.get("blockedSites", function(result) {

        var blockedSites = [];
        if (result.blockedSites) {
            blockedSites = result.blockedSites.split(",");
        }

        // loop thru array and remove element
        var arrayLength = blockedSites.length;
        var i = 0;
        for (i = 0; i < arrayLength; i++) {
            if (blockedSites[i] === selectedSite) {
                break;
            }
        }

        delete blockedSites[i];

        var actualVal = blockedSites.join();
        console.log(' array to string  ' + actualVal);

        chrome.storage.sync.set({ "blockedSites": actualVal});

        $('#blockedSites tr[id="'+selectedSite+'"]').remove();
        
    });
}
/**
 * Set2
 */
$("#save2").click(function(e) {
    e.preventDefault();
    var chan = $("#bchannel").val();

    chrome.storage.sync.get("blockedChans", function(result) {
        console.log(' in storage ' + result.blockedChans);

        var blockedChans = [];
        if (result.blockedChans) {
            blockedChans = result.blockedChans.split(",");
        }

        // add to storage
        blockedChans.push(chan);

        var actualVal = blockedChans.join();
        console.log(' array to string  ' + actualVal);

        chrome.storage.sync.set({ "blockedChans": actualVal});

        appendToTable2(chan);

    });

});


function appendToTable2(chanName) {
    var trVal = `<tr id="${chanName}"><td>${chanName}</td><td><a href="#" class="deleteChan" data-chan="${chanName}">&#128465;</a></td></tr>`;
    $('#youtubeKey > tbody:last-child').append(trVal);

    $('.deleteChan').off('click',handleDelete2);
    $('.deleteChan').on('click',handleDelete2);
    console.log(chanName);
    console.log(trVal);
}

function handleDelete2(e) {
    e.preventDefault();
    var selectedChan = $(this).data('chan');
    console.log(' Selected chanel ' + selectedChan);

    chrome.storage.sync.get("blockedChans", function(result) {

        var blockedChans = [];
        if (result.blockedChans) {
            blockedChans = result.blockedChans.split(",");
        }

        // loop thru array and remove element
        var arrayLength = blockedChans.length;
        var i = 0;
        for (i = 0; i < arrayLength; i++) {
            if (blockedChans[i] === selectedChan) {
                break;
            }
        }

        delete blockedChans[i];

        var actualVal = blockedChans.join();
        console.log(' array to string  ' + actualVal);

        chrome.storage.sync.set({ "blockedChans": actualVal});

        $('#youtubeKey tr[id="'+selectedChan+'"]').remove();
        
    });
}
/**
 * Set3
 */
$("#save3").click(function(e) {
    e.preventDefault();
    var word = $("#bword").val();

    chrome.storage.sync.get("blockedWords", function(result) {
        console.log(' in storage ' + result.blockedWords);

        var blockedWords = [];
        if (result.blockedWords) {
            blockedWords = result.blockedWords.split(",");
        }

        // add to storage
        blockedWords.push(word);

        var actualVal = blockedWords.join();
        console.log(' array to string  ' + actualVal);

        chrome.storage.sync.set({ "blockedWords": actualVal});

        appendToTable3(word);

    });

});


function appendToTable3(wordName) {
    var trVal = `<tr id="${wordName}"><td>${wordName}</td><td><a href="#" class="deleteWord" data-word="${wordName}">&#128465;</a></td></tr>`;
    $('#youtubeKey2 > tbody:last-child').append(trVal);

    $('.deleteWord').off('click',handleDelete3);
    $('.deleteWord').on('click',handleDelete3);
    console.log(WordName);
    console.log(trVal);
}

function handleDelete3(e) {
    e.preventDefault();
    var selectedWord = $(this).data('word');
    console.log(' Selected Word ' + selectedWord);

    chrome.storage.sync.get("blockedWords", function(result) {

        var blockedWords = [];
        if (result.blockedWords) {
            blockedwords = result.blockedWords.split(",");
        }

        // loop thru array and remove element
        var arrayLength = blockedWords.length;
        var i = 0;
        for (i = 0; i < arrayLength; i++) {
            if (blockedWords[i] === selectedWord) {
                break;
            }
        }

        delete blockedWords[i];

        var actualVal = blockedWords.join();
        console.log(' array to string  ' + actualVal);

        chrome.storage.sync.set({ "blockedWords": actualVal});

        $('#youtubeKey2 tr[id="'+selectedWord+'"]').remove();
        
    });
}