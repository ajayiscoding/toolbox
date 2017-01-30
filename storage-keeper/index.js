/* Simple module to work with local storage */
var StorageKeeper = (function () {
  var STORAGE_KEY = 'StorageKeeper:slot:' + Math.floor(Math.random() * 1000);
  var storageObj = {};
  var record;

  function _get(prop) {
    var record = JSON.parse(localStorage.getItem(STORAGE_KEY));

    return record[prop];
  };

  function _set(prop, value) {
    var storageObj = {};
    try {
      storageObj = JSON.parse(localStorage.getItem(STORAGE_KEY));
      storageObj[prop] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageObj));
    }
    catch (e) {}
  };


  try {
    record = localStorage.getItem(STORAGE_KEY);

    if (record) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageObj));
  }
  catch (e) {
    console.warn('localStorage trouble --> ', e);
  }

  return {
    get: _get,
    set: _set
  }
}());
