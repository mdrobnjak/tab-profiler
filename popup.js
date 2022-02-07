
// TODO: Use icons: camera, cog, arrow-alt-circle-right

var body = document.getElementById('body');
body.className = "body";
var popup = document.createElement('div');
popup.className = "popup";

// Snapshots
var snapshotButtons = document.createElement('div');

var snapshots = getSnapshots();

snapshots.forEach(snapshot => {
  var snapshotButton = document.createElement('button');
  snapshotButton.className = "btn";
  snapshotButton.innerHTML = "<i class=\"fas fa-arrow-alt-circle-right\"></i> " + snapshot.Name;
  snapshotButtons.appendChild(snapshotButton);
});

popup.appendChild(snapshotButtons);

// Capture

var captureButton =  document.createElement('button');
captureButton.className = "btn";
captureButton.innerHTML = "<i class=\"fas fa-camera\"></i> " + "Capture New Snapshot";
popup.appendChild(captureButton);

body.appendChild(popup);

function getSnapshots() {
  return [
    { "Name": "My Snapshot", "URL": "about:blank" },
    { "Name": "My Snapshot2", "URL": "about:config" }
  ]
}
