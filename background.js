chrome.runtime.onInstalled.addListener(() => {
  console.log('Loading tab profiles extension...');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.action === "createWindow") {
    chrome.windows.create({
      url: request.urlList
    });
  }
})