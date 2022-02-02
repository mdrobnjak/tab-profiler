
let changeColor = document.getElementById("changeColor");

//Hardcode button color as green
changeColor.style.backgroundColor = '#3aa757';

// When the button is clicked, open new tab
changeColor.addEventListener("click", async () => {

  chrome.tabs.create({'url': 'about:blank'}, function(tab) {
  });

});
