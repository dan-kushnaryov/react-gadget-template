var TestPlayer = require('./lib/test_player');
var player = new TestPlayer();

var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit'
};

module.exports = {
  beforeEach: function(browser) {
    player = new TestPlayer();
    player.start();
  },

  afterEach: function(callback) {
    player.stop(callback);
  },

  'Default authoring': function(browser) {
    player.visit(browser)
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)
      .saveScreenshot('images/default-authoring.png')
      .end();
  },

  'Default learning': function(browser) {
    player.visit(browser)
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)
      .click(ui.gadgetEditToggle)
      .saveScreenshot('images/default-learning.png')
      .end();
  }
};
