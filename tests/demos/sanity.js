var TestPlayer = require('./lib/test_player');
var player = new TestPlayer();

var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit'
};

module.exports = {
  beforeEach: function(client) {
    player = new TestPlayer();
    player.start();
  },

  afterEach: function(callback) {
    player.stop(callback);
  },

  'Default authoring': function(client) {
    player.visit(client)
      .waitForElementPresent(ui.gadgetInTray)
      .execute("window.$('" + ui.gadgetInTray + "').trigger('dblclick')")
      .waitForElementPresent(ui.gadgetInLesson)
      .saveScreenshot('images/default-authoring.png')
      .end();
  },

  'Default learning': function(client) {
    player.visit(client)
      .waitForElementPresent(ui.gadgetInTray)
      .execute("window.$('" + ui.gadgetInTray + "').trigger('dblclick')")
      .waitForElementPresent(ui.gadgetInLesson)
      .click(ui.gadgetEditToggle)
      .saveScreenshot('images/default-learning.png')
      .end();
  }
};
