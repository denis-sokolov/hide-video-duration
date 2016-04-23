chrome.storage.sync.get('patterns', function(storage){
    var patterns = Object.keys(storage.patterns || {});
    var container = document.querySelector('.patterns');
    patterns.forEach(function(pattern){
        var el = document.createElement('li');
        el.innerText = pattern;
        container.appendChild(el);
    });
});
