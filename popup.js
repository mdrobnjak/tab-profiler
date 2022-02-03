document.addEventListener("DOMContentLoaded", () => {
  renderTabProfiles();
});

profileList.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "LI") {
    let selectedIndex = adaptProfileIdToindex(e.target.id);

    listTabProfiles(function(result) {
      let profileName = result[selectedIndex].name;
      let numUrls = result[selectedIndex].urlList.length;
      let urlList = result[selectedIndex].urlList;

      if (confirm("Open \"" + profileName + "\"? (" + numUrls +" tabs in total)")) {
        chrome.runtime.sendMessage({
          action: "createWindow",
          urlList: urlList
        });
      } 
    });
  }
});

changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.sync.clear();
    chrome.tabs.query({currentWindow: true}, function(tabs){
      let tabUrls = tabs.map(t => t.url)
      let tabProfileName = document.getElementById('tab-profile-name').value;
      appendTabProfile(tabUrls, tabProfileName, renderTabProfiles);

    });
  });

function listTabProfiles(callbackFn) {
  chrome.storage.local.get("tabProfiles", function(result) {
    !!result.tabProfiles ? callbackFn(result.tabProfiles) : callbackFn({});
  });
}

function appendTabProfile(tabUrls, tabProfileName, callbackFn) {
  chrome.storage.local.get("tabProfiles", function(result) {

    let updatedProfiles = !!result.tabProfiles ? result.tabProfiles : [];
    updatedProfiles.push({
      name: tabProfileName, 
      urlList: tabUrls
    });

    chrome.storage.local.set({"tabProfiles": updatedProfiles}, callbackFn);
  });
} 

function renderTabProfiles() {
  chrome.storage.local.get(['tabProfiles'], function(result) {
    let updatedProfileListHtml = "";
    result.tabProfiles.forEach((profile, index) => {
      updatedProfileListHtml += renderProfileListItem(profile.name, index);
    });

    document.getElementById('profileList').innerHTML = updatedProfileListHtml;

  });
}

function renderProfileListItem(profileName, index) {
  return "<li id=\"" + adaptProfileIndexToId(index) + "\">" +  profileName + "</li>";
}

function adaptProfileIndexToId(index) {
  return "profileListItem-"+index;
}

function adaptProfileIdToindex(profileItemId) {
  return profileItemId.replace("profileListItem-", "");
}