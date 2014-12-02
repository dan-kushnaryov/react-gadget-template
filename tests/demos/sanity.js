var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit',
  gadgetDelete: '.js-trash',
  gadgetWrapper: '.gadget',
  gadgetConfirmDelete: '.js-delete'
};

module.exports = {
  beforeEach: function(browser) {
    browser
      .url('http://127.0.0.1:6952')
      .resizeWindow(1600, 900)
      .frame(0)
  },

  'Default authoring': function(browser) {
    browser
      // Background: add a gadget
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)

      // Assert: nothing to assert, just take a screenshot
      .pause(500).saveScreenshot('images/author-added-gadget.png')

      // Cleanup: get rid of the gadget
      .waitForElementPresent(ui.gadgetDelete)
      .click(ui.gadgetWrapper) // strange way to make the delete icon visible
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  },

  'Default learning': function(browser) {
    browser
      // Background: add a gadget
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .waitForElementPresent(ui.gadgetInLesson)

      // Setup: toggle to learning
      .click(ui.gadgetEditToggle)

      // Assert: nothing to assert, just take a screenshot
      .pause(500).saveScreenshot('images/author-toggled-to-learner.png')

      // Cleanup: delete the gadget
      .waitForElementPresent(ui.gadgetDelete)
      .click(ui.gadgetWrapper) // strange way to make the delete icon visible
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  }
};
