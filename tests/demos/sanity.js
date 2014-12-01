var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetEditToggle: '.js-edit',
  gadgetDelete: '.js-trash',
  gadgetConfirmDelete: '.js-delete',
  gadgetNameInput: 'input',
  gadgetToolbar: '.toolbar'
};

module.exports = {
  beforeEach: function(browser) {
    browser
      .url('http://127.0.0.1:3000')
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
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .pause(500)
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
      .click(ui.gadgetDelete)
      .waitForElementPresent(ui.gadgetConfirmDelete)
      .pause(500)
      .click(ui.gadgetConfirmDelete)
      .waitForElementNotPresent(ui.gadgetInLesson)
      .end();
  },

  'Author saves their name': function(browser) {
    ui.authorName = '.name';
    ui.gadgetWrapper = '.gadget';

    browser
      // Background: add a gadget
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)
      .frame(0)

      // Setup: Delete name and type a new one
      // TODO maybe we can use keys() since the
      // field should have focus?
      .setValue(ui.authorName, 'Theodora')
      .pause(500).saveScreenshot('images/author-typed-name.png')
      .pause(500)

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
  }
};
