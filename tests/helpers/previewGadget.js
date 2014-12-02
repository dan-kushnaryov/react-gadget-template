exports.command = function (selector) {
  var browser = this;

  browser
    .url('http://127.0.0.1:6952')
    .resizeWindow(1600, 900)
    .frame(0)

  return browser;
}

