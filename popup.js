var body = document.getElementById('body');
var popup = document.createElement('div');
var snapshotButtons = document.createElement('div');

var snapshots = getSnapshots();

snapshots.forEach(snapshot => {
  var snapshotButton = document.createElement('button');
  snapshotButton.className = "btn";
  snapshotButton.innerHTML = snapshot.Name;
  snapshotButtons.appendChild(snapshotButton);
});

popup.appendChild(snapshotButtons);
body.appendChild(popup);

function getSnapshots() {
  return [
    { "Name": "My Snapshot", "URL": "about:blank" },
    { "Name": "My Snapshot2", "URL": "about:config" }
  ]
}

