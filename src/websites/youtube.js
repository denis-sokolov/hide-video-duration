(function(){
    if ('hide-video-duration-performed' in window) return
    window['hide-video-duration-performed'] = true;

    var style = document.createElement('style');
    style.innerText = '.ytp-progress-bar, .ytp-time-separator, .ytp-time-duration, .video-time { display: none !important; }';
    document.head.appendChild(style);

    var seekVideo = function(amount){
        var video = document.querySelector('.html5-main-video');
        if (!video || !Number.isFinite(video.currentTime)) return;
        video.currentTime = video.currentTime + amount;
    };

    var addButton = function(text, duration){
        var el = document.createElement('span');
        el.innerText = text;
        el.style.marginLeft = '15px';
        el.style.cursor = 'pointer';
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
        el.addEventListener('click', function(){ seekVideo(duration); });
        document.querySelector('.ytp-time-duration').parentNode.appendChild(el);
    };

    addButton('-10 min', -600);
    addButton('-1 min', -60);
    addButton('-10 s', -10);
    addButton('+10 s', 10);
    addButton('+1 min', 60);
    addButton('+10 min', 600);
})();
