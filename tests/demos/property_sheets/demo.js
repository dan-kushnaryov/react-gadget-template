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
      // Background
      .addGadgetToLesson()

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

      // Cleanup
      .removeGadgetFromLesson()
      .end();
  }
};
