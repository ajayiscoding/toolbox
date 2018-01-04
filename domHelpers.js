function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  var nodes = document.querySelectorAll(selector);

  return Array.prototype.slice.call(nodes);
}
