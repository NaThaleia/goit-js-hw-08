// Инициализируем плеер в файле скрипта согласно документации
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

// берем лодеш
const throttle = require('lodash.throttle');

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', Math.round(data.seconds));
  console.log(Number(localStorage.getItem('videoplayer-current-time')));
};
player.on('timeupdate', throttle(onPlay, 1000));

const onSetup = function () {
  player.setCurrentTime(Number(localStorage.getItem('videoplayer-current-time')));
};
window.onload = onSetup;
