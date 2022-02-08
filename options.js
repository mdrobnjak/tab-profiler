
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
          { name: "name", type: "text", width: 100, validate: "required", css: 'gray', headercss: 'gray' },
          { name: "urlList", type: "text", sorting: false, css: 'gray', headercss: 'gray' },
          { type: "control", css: 'gray', headercss: 'gray' }
      ]
    });
  });

});
