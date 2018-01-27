
// ts – конечной даты
// options
// options.selectors – объект селекторов для циферок
// options.h – часы
// options.m – минуты
// options.s – секунды
// options.onExpired – обработчик по истечению отсчета
function Countdown (endTS, options) {
  function qs(s) {
    return document.querySelector(s);
  }

  var end = endTS;
  var onExpired = options && options.onExpired;
  var selectors = options && options.selectors;
  var d = qs(selectors && selectors.d ? selectors.d : '.js-d');
  var h = qs(selectors && selectors.h ? selectors.h : '.js-h');
  var m = qs(selectors && selectors.m ? selectors.m : '.js-m');
  var s = qs(selectors && selectors.s ? selectors.s : '.js-s');
  var timeoutId;

  this.stop = function () {
    clearTimeout(timeoutId);
  };

  function prettyDigit(digit) {
    return digit < 10 ? '0' + digit : digit;
  }

  function go(now, end) {
    var last = end - now;
    var days = Math.floor(last / (1000 * 60 * 60 * 24));
    var hours = Math.floor((last / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((last / (1000 * 60)) % 60);
    var seconds = Math.floor((last / 1000) % 60);

    if (last <= 0) {
      onExpired && onExpired();
      return;
    }

    d.innerHTML = prettyDigit(days);
    h.innerHTML = prettyDigit(hours);
    m.innerHTML = prettyDigit(minutes);
    s.innerHTML = prettyDigit(seconds);

    timeoutId = setTimeout(function () {
      go(+(new Date()), end);
    }, 1000);
  }

  go(+(new Date()), end);
}

window.Countdown = Countdown;
