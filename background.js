var urls = ['https://pipelines.amazon.com/pipelines/ConnectionsPopManService',
'https://monitorportal.amazon.com/monitors/overview?id=us-east-1%3AConnectionsPopManService%3AProd%3AErrors',
'https://w.amazon.com/bin/view/Amazon_Connections/Development/Populations/Dashboards/Application_Metrics#All_Services'];
var snapshotName = 'PopMan Ops';

var urls2 = ['https://www.youtube.com/', 'https://www.instagram.com/'];
var snapshotName2 = 'Leisure';

var urls3 = ['https://phonetool.amazon.com/users/drobnjak',
'https://phonetool.amazon.com/users/sewjacob'];
var snapshotName3 = 'Created By';

var snapshots = [
  { tabSnapshotName: snapshotName, tabUrls: urls},
  { tabSnapshotName: snapshotName2, tabUrls: urls2},
  { tabSnapshotName: snapshotName3, tabUrls: urls3}
];

chrome.runtime.onInstalled.addListener(() => {
  console.log('Loading Tab Snapshots extension...');
  saveSnapshots(snapshots);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  playSound(message.type+".mp3");
});

function saveSnapshots(snapshots) {
  chrome.storage.local.get("tabSnapshots", function(result) {

    let updatedSnapshots = !!result.tabSnapshots ? result.tabSnapshots : [];

    snapshots.forEach( snapshot => {
      updatedSnapshots.push({
        name: snapshot.tabSnapshotName, 
        urlList: snapshot.tabUrls
      });
    })

    chrome.storage.local.set({"tabSnapshots": updatedSnapshots});
  });
}

function playSound(filename) {
  let url = chrome.runtime.getURL('audio.html');

  url += '?volume=1&src='+filename+'&length=700';

  chrome.windows.create({
      type: 'popup',
      focused: false,
      top: 1,
      left: 1,
      height: 1,
      width: 1,
      url,
  })

}