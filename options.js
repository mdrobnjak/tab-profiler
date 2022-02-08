
$(document).ready(function () {

  chrome.storage.local.get("tabSnapshots", function(result) {

    var snapshots = !!result["tabSnapshots"] ? result["tabSnapshots"] : [];
    snapshots.forEach(snapshot => {
      snapshot.urlList = snapshot.urlList.join(",");
    });

    $("#jsGrid").jsGrid({
      width: "100%",
      height: "400px",
  
      inserting: true,
      editing: true,
      sorting: true,
      paging: true,
  
      data: snapshots,
  
      fields: [
          { name: "name", type: "text", width: 100, validate: "required" },
          { name: "urlList", type: "text", sorting: false },
          { type: "control" }
      ]
    });
  });

});
