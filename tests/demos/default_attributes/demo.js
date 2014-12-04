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

  'Author sees default set correctly': function(browser) {
    ui.smiles = '.smiles';
    ui.numberOfSmilesPropSheet = '#numberOfSmiles';
    ui.learnerName = '.learnerName';

    browser
      // Background
      .addGadgetToLesson()

      // Setup: set value on property sheet
      .waitForElementPresent(ui.numberOfSmilesPropSheet)

      // Assert: the correct number of smiles are present
      .pause(500)
      .assert.value(ui.numberOfSmilesPropSheet, '3')

      // Cleanup
      // TODO make removeGadgetFromLesson deal with
      // making sure we're at the correct frame
      .frame(0) // TEMP
      // Cleanup
      .removeGadgetFromLesson()
      .end();
  }
};
