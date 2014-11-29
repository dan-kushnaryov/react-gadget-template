var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit',
  gadgetDelete: '.js-trash',
  gadgetConfirmDelete: '.js-delete'
};

module.exports = {
  beforeEach: function(browser) {
    browser
      .url('http://127.0.0.1:3000')
      .frame(0)
  },

  'Default authoring': function(browser) {
    browser
      // setup
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)

      // assert
      .pause(500).saveScreenshot('images/default-authoring.png')

      // cleanup
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .pause(500)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  },

  'Default learning': function(browser) {
    browser
      // setup
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)

      // assert
      .click(ui.gadgetEditToggle)
      .pause(500).saveScreenshot('images/default-learning.png')

      // cleanup
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .pause(500)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  }
};
