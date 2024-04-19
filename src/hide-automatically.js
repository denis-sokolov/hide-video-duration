chrome.tabs.onUpdated.addListener(function (id) {
  chrome.tabs.get(id, function (tab) {
    if (!tab || !tab.title) return;
    chrome.storage.sync.get("patterns", function (storage) {
      var patterns = Object.keys(storage.patterns || {});
      var patternFound = patterns.some(function (pattern) {
        return tab.title.indexOf(pattern) > -1;
      });
      if (!patternFound) return;
      chrome.scripting.executeScript({
        target: { tabId: id },
        files: ["src/websites/youtube.js"],
      });
    });
  });
});
