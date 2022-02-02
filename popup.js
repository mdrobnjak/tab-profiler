
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    //chrome.storage.sync.clear();
    chrome.tabs.query({currentWindow: true}, function(tabs){
      let tabUrls = tabs.map(t => t.url)
      let tabProfileName = document.getElementById('tab-profile-name').value;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: storeTabProfile,
        args: [tabUrls, tabProfileName]
      });

    });


  });

function storeTabProfile(tabUrls, tabProfileName) {
  chrome.storage.sync.get("tabProfiles", function(result) {

    let updatedProfiles = !!result.tabProfiles ? result.tabProfiles : {};

    updatedProfiles[tabProfileName] = tabUrls;


    chrome.storage.sync.set({"tabProfiles": updatedProfiles}, function() {
      chrome.storage.sync.get(["tabProfiles"], function(result) {
        console.log("UPDATED PROFILE LIST!! ", result);
      });
    })
  });
}