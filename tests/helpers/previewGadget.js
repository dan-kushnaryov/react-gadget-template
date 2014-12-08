exports.command = function () {
  var browser = this;

  browser
    .url('http://localhost:6952')
    .resizeWindow(1280, 800)
    .frame(0);

  return browser;
};
