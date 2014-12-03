var ui = {
  gadgetEditToggle: '.js-edit',
  gadgetWrapper: '.gadget'
};

module.exports = {
  beforeEach: function(browser) {
    browser.previewGadget();
  },

  'Author saves their name': function(browser) {
    ui.authorName = '.authorName';

    browser
      // Background
      .addGadgetToLesson()

      // Setup: Type a new name
      .keys('Theodora')
      .saveScreen('author-typed-name')

      // Setup: refresh the browser
      .pause(500).refresh()
      // get back to the gadget iframe
      .frame(0).frame(0)
      .waitForElementPresent(ui.authorName)

      // Assert: the author's new name appears
      .assert.containsText(ui.authorName, 'Theodora')
      .saveScreen('author-refreshed')

      // Cleanup
      .removeGadgetFromLesson()
      .end();
  },

  'Learner saves their name': function(browser) {
    ui.learnerName = '.learnerName';

    browser
      // Background
      .addGadgetToLesson()

      // Setup: toggle to learning
      // strange way to make the edit icon visible
      .click(ui.gadgetWrapper)
      .click(ui.gadgetEditToggle)

      // Setup: Type a new name
      .keys('Rebecca')
      .saveScreen('learner-typed-name')

      // Setup: refresh the browser
      .pause(500).refresh()
      // get back to the gadget iframe
      .frame(0).frame(0)
      .waitForElementPresent(ui.learnerName)

      // Assert: the author's new name appears
      .assert.valueContains(ui.learnerName, 'Rebecca')
      .saveScreen('learner-refreshed')

      // Cleanup
      .removeGadgetFromLesson()
      .end();
  }
};
