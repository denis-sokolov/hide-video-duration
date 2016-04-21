chrome.tabs.insertCSS({
    code: '.ytp-progress-bar,.ytp-time-separator,.ytp-time-duration,.video-time{display:none!important}'
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    var tab = tabs[0];
    document.querySelector('.add-a-rule input').value =
        tab.title.replace(/[\s-]+YouTube$/, '');
});
document.querySelector('.hide-automatically').addEventListener('click', function(){
    document.querySelector('.hide-success').style.display = 'none';
    document.querySelector('.add-a-rule').style.display = 'block';
    document.querySelector('.add-a-rule input').focus();
})
