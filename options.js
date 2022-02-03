$(document).ready(function () {
  var snapshots = [
    { "Name": "My Snapshot", "URL": "about:blank" }];

  $("#jsGrid").jsGrid({
    width: "100%",
    height: "400px",

    inserting: true,
    editing: true,
    sorting: true,
    paging: true,

    data: snapshots,

    fields: [
        { name: "Name", type: "text", width: 100, validate: "required" },
        { name: "URLs", type: "text", sorting: false },
        { type: "control" }
    ]
  });
});
