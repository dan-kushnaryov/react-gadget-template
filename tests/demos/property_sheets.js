var ui = {
  gadgetInTray: '.tray-gadget',
  gadgetInLesson: '.gadgetContent',
  gadgetDelete: '.js-trash',
  gadgetConfirmDelete: '.js-delete',
  gadgetWrapper: '.gadget'
};

module.exports = {
  beforeEach: function(browser) {
    browser.previewGadget();
  },

  'Author changes the number of smiles': function(browser) {
    ui.smiles = '.smiles';
    ui.numberOfSmilesPropSheet = '#numberOfSmiles';
    ui.learnerName = '.learnerName';

    browser
      // Background: add a gadget
      .waitForElementPresent(ui.gadgetInTray)
      .jqueryDoubleClick(ui.gadgetInTray)

      // Setup: set value on property sheet
      .waitForElementPresent(ui.numberOfSmilesPropSheet)
      .setValue(ui.numberOfSmilesPropSheet, 1)
      .pause(500).saveScreenshot('images/learner-changed-property-sheet.png')

      // Assert: the correct number of smiles are present
      .frame(0)
      .waitForElementPresent(ui.smiles)
      .assert.containsText(ui.smiles, '(:')
      .pause(500).saveScreenshot('images/learner-refreshed.png')

      // Setup: set value on property sheet
      .frameParent(0)
      .setValue(ui.numberOfSmilesPropSheet, 2)
      .pause(500).saveScreenshot('images/learner-changed-property-sheet-again.png')

      // Assert: the correct number of smiles are present
      .frame(0)
      .waitForElementPresent(ui.smiles)
      .assert.containsText(ui.smiles, '(:(:')
      .pause(500).saveScreenshot('images/learner-refreshed.png')

      // Cleanup: delete gadget
      .frameParent() // get back to the player iframe
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
