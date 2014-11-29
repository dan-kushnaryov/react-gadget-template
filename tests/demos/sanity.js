var TestPlayer = require('./lib/test_player');

module.exports = {
  beforeEach: function(client, callback) {
    this.player = new TestPlayer();
    this.player.start();
    callback();
  },

  afterEach: function(callback) {
    this.player.stop(callback);
  },

  'Default authoring': function(client) {
   this.player.visit(client)
      .waitForElementPresent('.tray-gadget', 2000)
      .execute("window.$('.tray-gadget:nth-child(1)').trigger('dblclick')")
      .waitForElementPresent('.gadgetContent', 2000)
      .saveScreenshot('images/default-authoring.png')
      .end();
  },

  'Default learning': function(client) {
    this.player.visit(client)
      .waitForElementPresent('.tray-gadget', 2000)
      .execute("window.$('.tray-gadget:nth-child(1)').trigger('dblclick')")
      .waitForElementPresent('.js-edit', 2000)
      .click('.js-edit')
      .saveScreenshot('images/default-learning.png')
      .end();
  }
};
