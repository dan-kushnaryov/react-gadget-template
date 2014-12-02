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
    browser.previewGadget();
  },

  'Default authoring': function(browser) {
    browser
      // Background
      .addGadgetToLesson()

      // Assert: nothing to assert, just take a screenshot
      .pause(500).saveScreenshot('images/author-added-gadget.png')

      // Cleanup: get rid of the gadget
      .waitForElementPresent(ui.gadgetDelete)
      // strange way to make the delete icon visible
      .click(ui.gadgetWrapper)
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  },

  'Default learning': function(browser) {
    browser
      // Background
      .addGadgetToLesson()

      // Setup: toggle to learning
      .click(ui.gadgetEditToggle)

      // Assert: nothing to assert, just take a screenshot
      .pause(500).saveScreenshot('images/author-toggled-to-learner.png')

      // Cleanup: delete the gadget
      .waitForElementPresent(ui.gadgetDelete)
      // strange way to make the delete icon visible
      .click(ui.gadgetWrapper)
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  }
};
