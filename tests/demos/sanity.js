var TestPlayer = require('./lib/test_player');
var player = new TestPlayer();

var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit',
  gadgetDelete: '.js-trash',
  gadgetConfirmDelete: '.js-delete'
};

module.exports = {
  before: function(browser, callback) {
    player = new TestPlayer();
    player.start(callback);
  },

  after: function(browser, callback) {
    player.stop(callback);
  },

  'Default authoring': function(browser) {
    player.visit(browser)
      // setup
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)

      // assert
      .saveScreenshot('images/default-authoring.png')


      // cleanup
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .end();
  },

  'Default learning': function(browser) {
    player.visit(browser)
      // setup
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)

      // assert
      .click(ui.gadgetEditToggle)
      .saveScreenshot('images/default-learning.png')

      // cleanup
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .end();
  }
};
