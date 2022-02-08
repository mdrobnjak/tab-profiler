
var body = document.getElementById('body');
body.className = "body";
var popup = document.createElement('div');
popup.className = "popup";
body.appendChild(popup);

renderCaptureButton();

renderConfigButton();

renderClearButton();

renderDivider();

renderSnapshotButtons();

renderDivider();

renderFooter();

/*
  Capture
*/
function renderCaptureButton() {
  var captureButton =  document.createElement('button');
  captureButton.className = "btn";
  captureButton.id = "capture";
  captureButton.innerHTML = "<i class=\"fas fa-camera\"></i> " + "Capture";
  popup.appendChild(captureButton);  
}

capture.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.query({currentWindow: true}, function(tabs){
    let tabUrls = tabs.map(t => t.url)
    let tabSnapshotName = tabs[0].title;
    saveSnapshot(tabUrls, tabSnapshotName);
  });

  window.location.reload();
});

function saveSnapshot(tabUrls, tabSnapshotName) {
  chrome.storage.local.get("tabSnapshots", function(result) {

    let updatedSnapshots = !!result.tabSnapshots ? result.tabSnapshots : [];
    updatedSnapshots.push({
      name: tabSnapshotName, 
      urlList: tabUrls
    });

    chrome.storage.local.set({"tabSnapshots": updatedSnapshots});
  });
}

/*
  Config
*/
function renderConfigButton() {
  var configButton =  document.createElement('button');
  configButton.className = "btn";
  configButton.id = "config";
  configButton.innerHTML = "<i class=\"fas fa-cog\"></i> " + "Config";
  popup.appendChild(configButton);  
}

config.addEventListener("click", async () => {
  chrome.tabs.create({
    url: "chrome-extension://hoadnmjaaoigkneinkbihgdmcdphdidi/options.html"
  });
});

/*
  Clear
*/
function renderClearButton() {
  var clearButton =  document.createElement('button');
  clearButton.className = "btn";
  clearButton.id = "clear";
  clearButton.innerHTML = "<i class=\"fas fa-trash-alt\"></i> " + "Clear";
  popup.appendChild(clearButton);  
}

clear.addEventListener("click", async () => {
  chrome.storage.local.clear();

  window.location.reload();
});

/*
  Divider
*/
function renderDivider(){
  var divider = document.createElement('hr');
  divider.className = "divider";
  popup.appendChild(divider);
}

/*
  Load Snapshots
*/
function renderSnapshotButtons() {

  var snapshotButtons = document.createElement('div');
  popup.appendChild(snapshotButtons);

  chrome.storage.local.get("tabSnapshots", function(result) {

    var snapshots = !!result["tabSnapshots"] ? result["tabSnapshots"] : [];

    snapshots.forEach(snapshot => {
      var snapshotButton = document.createElement('button');
      snapshotButtons.appendChild(snapshotButton);
      snapshotButton.className = "btn";
      snapshotButton.id = "snapshot";
      snapshotButton.innerHTML = "<i class=\"far fa-arrow-alt-circle-right\"></i> " + snapshot.name;
      snapshotButton.addEventListener("click", async () => loadSnapshot(snapshot.name));
    });

  });
}

function loadSnapshot(name) {
  chrome.storage.local.get("tabSnapshots", function(result) {
    result["tabSnapshots"].forEach(tabSnapshot => {
      if(tabSnapshot.name == name) {
        tabSnapshot.urlList.forEach(url => {
          chrome.tabs.create({
            url: url
          });
        })
      }
    })
  })

  window.location.reload();
}

/*
  Footer
*/
function renderFooter() {
  var footer = document.createElement('div');
  footer.className = "footer";
  footer.innerHTML = "Tab Snapshots";
  popup.appendChild(footer);
}