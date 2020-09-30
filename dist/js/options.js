var bsitecount = -1;
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
                    appendToTable(blockedSites[i]);
                    //var trVal = `<tr><td>${blockedSites[i]}</td><td>🗑</td></tr>`;
                    //$('#blockedSites > tbody:last-child').append(trVal);    
                }
                
                $('.deleteSite').off('click',handleDeleteSite);
                $('.deleteSite').on('click',handleDeleteSite);

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

$("#save").click(function(e) {
    e.preventDefault();
    var site = $("#bsite").val();

    var blockedSites = [];
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

        appendToTable(site);

        //var trVal = `<tr><td>${site}</td><td>🗑</td></tr>`;
        //$('#blockedSites > tbody:last-child').append(trVal);
        

    });

    //$('#mmTbody').append(trVal);
});

function appendToTable(siteName) {
    var trVal = `<tr id="${siteName}"><td>${siteName}</td><td><a href="#" class="deleteSite" data-site="${siteName}">&#128465;</a></td></tr>`;
    $('#blockedSites > tbody:last-child').append(trVal);

    $('.deleteSite').off('click',handleDeleteSite);
    $('.deleteSite').on('click',handleDeleteSite);
    console.log(siteName);
    console.log(trVal);
}

function handleDeleteSite(e) {
    e.preventDefault();
    var selectedSite = $(this).data('site');
    console.log(' Selected site ' + selectedSite);

    var blockedSites = [];
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
