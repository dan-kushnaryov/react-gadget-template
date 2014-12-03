var ui = {
  gadgetEditToggle: '.js-edit'
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
      .saveScreen('author-added-gadget')

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
      .saveScreen('author-toggled-to-learner')

      // Cleanup
      // TODO make removeGadgetFromLesson deal with
      // making sure we're at the correct frame
      .frame(0) // TEMP
      .removeGadgetFromLesson()
      .end();
  }
};
