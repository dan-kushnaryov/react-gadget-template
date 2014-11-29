exports.command = function (selector) {
  var browser = this;

  browser
    .execute("window.$('" + selector + "').trigger('dblclick')");

  return browser;
}
