chrome.storage.sync.get('patterns', function(storage){
    var patterns = Object.keys(storage.patterns || {});
    var container = document.querySelector('.patterns');
    patterns.forEach(function(pattern){
        var el = document.createElement('li');
        el.innerText = pattern;
        var button = document.createElement('button');
        button.innerText = chrome.i18n.getMessage('options_remove_rule');
        button.style.marginLeft = '10px';
        button.addEventListener('click', function(){
            chrome.storage.sync.get('patterns', function(storage){
                var val = (storage.patterns || {})
                delete val[pattern];
                chrome.storage.sync.set({ patterns: val });
            });
            el.remove();
        });
        el.appendChild(button);
        container.appendChild(el);
    });
});
