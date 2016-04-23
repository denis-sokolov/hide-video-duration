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

    var button = function(text, duration){
        var el = document.createElement('span');
        var thinSpace = ' ';
        el.innerText = text.replace(' ', thinSpace);
        el.style.cursor = 'pointer';
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
        el.addEventListener('click', function(){ seekVideo(duration); });
        return el;
    };

    var addButton = function(text, duration){
        var el = button(text, duration);
        var container = document.querySelector('.ytp-time-duration').parentNode;
        if (duration < 0) {
            el.style.marginRight = '15px';
            container.insertBefore(el, document.querySelector('.ytp-time-current'));
        } else {
            el.style.marginLeft = '15px';
            container.appendChild(el);
        }
    };

    addButton('-10 min', -600);
    addButton('-1 min', -60);
    addButton('-10 s', -10);
    addButton('+10 s', 10);
    addButton('+1 min', 60);
    addButton('+10 min', 600);
})();
