exports.command = function () {
  var browser = this;

  var ui = {
    gadgetInTray: '.tray-gadget',
    gadgetInLesson: '.gadgetContent'
  };

  browser
    .waitForElementPresent(ui.gadgetInTray)
    .jqueryDoubleClick(ui.gadgetInTray)
    .waitForElementPresent(ui.gadgetInLesson);

  return browser;
};
