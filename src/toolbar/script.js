chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.storage.sync.get("patterns", function (storage) {
    var patterns = Object.keys(storage.patterns || {});
    var patternFound = patterns.some(function (pattern) {
      return tab.title.indexOf(pattern) > -1;
    });
    if (!patternFound) return;
    document.querySelector(".hide-success").style.display = "none";
    document.querySelector(".hidden-automatically").style.display = "block";
  });

  var tab = tabs[0];

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["src/websites/youtube.js"],
  });

  document.querySelector(".add-a-rule input").value = tab.title.replace(
    /[\s-]+YouTube$/,
    "",
  );
});
document
  .querySelector(".hide-automatically")
  .addEventListener("click", function () {
    document.querySelector(".hide-success").style.display = "none";
    document.querySelector(".add-a-rule").style.display = "block";
    document.querySelector(".add-a-rule input").focus();
  });

document
  .querySelector(".add-a-rule button")
  .addEventListener("click", function () {
    chrome.permissions.request({
      origins: ["http://www.youtube.com/", "https://www.youtube.com/"],
    });

    document.querySelector(".add-a-rule").style.display = "none";
    document.querySelector(".rule-added").style.display = "block";

    var pattern = document.querySelector(".add-a-rule input").value;
    chrome.storage.sync.get("patterns", function (storage) {
      var patterns = storage.patterns || {};
      patterns[pattern] = true;
      chrome.storage.sync.set({ patterns: patterns });
    });
  });

document
  .querySelector(".stop-hiding-automatically")
  .addEventListener("click", function () {
    document.querySelector(".hidden-automatically").style.display = "none";
    document.querySelector(".stopped-hiding-automatically").style.display =
      "block";

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      chrome.storage.sync.get("patterns", function (storage) {
        var patterns = storage.patterns || {};
        Object.keys(patterns)
          .filter(function (pattern) {
            return tab.title.indexOf(pattern) > -1;
          })
          .forEach(function (pattern) {
            delete patterns[pattern];
          });
        chrome.storage.sync.set({ patterns: patterns });
      });
    });
  });
