
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.youtube.com', pathPrefix: '/watch' }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.tabs.onUpdated.addListener(function(id){
  chrome.tabs.get(id, function(tab){
    if (!tab.title) return;
    chrome.storage.sync.get('patterns', function(storage){
      var patterns = Object.keys(storage.patterns || {});
      var patternFound = patterns.some(function(pattern){
          return tab.title.indexOf(pattern) > -1;
      });
      if (!patternFound) return;
      chrome.tabs.insertCSS(id, {
          code: '.ytp-progress-bar,.ytp-time-separator,.ytp-time-duration,.video-time{display:none!important}'
      });
    })
  })
})
