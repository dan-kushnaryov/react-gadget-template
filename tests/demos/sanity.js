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

      // Cleanup
      // TODO make removeGadgetFromLesson deal with
      // making sure we're at the correct frame
      .frame(0) // TEMP
      .removeGadgetFromLesson()
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

      // Cleanup
      // TODO make removeGadgetFromLesson deal with
      // making sure we're at the correct frame
      .frame(0) // TEMP
      .removeGadgetFromLesson()
      .end();
  }
};
