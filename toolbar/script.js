chrome.tabs.insertCSS({
    code: '.ytp-progress-bar,.ytp-time-separator,.ytp-time-duration,.video-time{display:none!important}'
});

document.querySelector('.hide-automatically').addEventListener('click', function(){
    document.querySelector('.hide-success').style.display = 'none';
    document.querySelector('.add-a-rule').style.display = 'block';
    document.querySelector('.add-a-rule input').focus();
})
