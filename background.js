chrome.runtime.onInstalled.addListener(() => {
  console.log('Loading Tab Snapshots extension...');
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch(message.type) {
    case "shutter":
      playSound(message.type+".mp3");
      break;
    case "trash":
      playSound(message.type+".mp3");
      break;
    case "blip":
      playSound(message.type+".mp3")
  }
});

function playSound(filename) {
  let url = chrome.runtime.getURL('audio.html');

  url += '?volume=0.5&src='+filename+'&length=700';

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