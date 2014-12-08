exports.command = function () {
  var browser = this;

  browser
    .url('http://127.0.0.1:6952')
    .resizeWindow(1280, 800)
    .frame(0);

  return browser;
};
