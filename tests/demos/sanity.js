var TestPlayer = require('./lib/test_player');
var player = new TestPlayer();

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
      .waitForElementPresent('.tray-gadget')
      .execute("window.$('.tray-gadget:nth-child(1)').trigger('dblclick')")
      .waitForElementPresent('.gadgetContent')
      .saveScreenshot('images/default-authoring.png')
      .end();
  },

  'Default learning': function(client) {
    player.visit(client)
      .waitForElementPresent('.tray-gadget')
      .execute("window.$('.tray-gadget:nth-child(1)').trigger('dblclick')")
      .waitForElementPresent('.js-edit')
      .click('.js-edit')
      .saveScreenshot('images/default-learning.png')
      .end();
  }
};
