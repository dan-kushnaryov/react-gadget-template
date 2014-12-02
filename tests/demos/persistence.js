var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit',
  gadgetDelete: '.js-trash',
  gadgetConfirmDelete: '.js-delete',
  gadgetWrapper: '.gadget'
};

module.exports = {
  beforeEach: function(browser) {
    browser
      .url('http://127.0.0.1:6952')
      .resizeWindow(1600, 900)
      .frame(0)
  },

  'Author saves their name': function(browser) {
    ui.authorName = '.authorName';

    browser
      // Background: add a gadget
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .frame(0)

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

      // Cleanup: delete gadget
      .frameParent() // get back to the player iframe
      .waitForElementPresent(ui.gadgetDelete)
      .click(ui.gadgetWrapper) // strange way to make the delete icon visible
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  },

  'Learner saves their name': function(browser) {
    ui.learnerName = '.learnerName';

    browser
      // Background: add a gadget
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)

      // Setup: toggle to learning
      .click(ui.gadgetWrapper) // strange way to make the delete icon visible
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

      // Cleanup: delete gadget
      .frameParent() // get back to the player iframe
      .waitForElementPresent(ui.gadgetDelete)
      .click(ui.gadgetWrapper) // strange way to make the delete icon visible
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  }
};
