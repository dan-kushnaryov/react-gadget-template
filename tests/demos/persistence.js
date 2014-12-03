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
      .pause(500).saveScreenshot('images/author-typed-name.png')

      // Setup: refresh the browser
      .refresh()
      .frame(0).frame(0) // get back to the gadget iframe
      .waitForElementPresent(ui.authorName)

      // Assert: the author's new name appears
      .assert.containsText(ui.authorName, 'Theodora')
      .pause(500).saveScreenshot('images/author-refreshed.png')

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
      // strange way to make the delete icon visible
      .click(ui.gadgetWrapper)
      .click(ui.gadgetEditToggle)

      // Setup: Type a new name
      .keys('Rebecca')
      .pause(5000).saveScreenshot('images/learner-typed-name.png')

      // Setup: refresh the browser
      .refresh()
      .frame(0).frame(0) // get back to the gadget iframe
      .waitForElementPresent(ui.learnerName)

      // Assert: the author's new name appears
      .assert.valueContains(ui.learnerName, 'Rebecca')
      .pause(500).saveScreenshot('images/learner-refreshed.png')

      // Cleanup
      .removeGadgetFromLesson()
      .end();
  }
};
