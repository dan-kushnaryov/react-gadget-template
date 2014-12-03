exports.command = function () {
  var browser = this;

  var ui = {
    gadgetInLesson: '.gadgetContent',
    gadgetDelete: '.js-trash',
    gadgetConfirmDelete: '.js-delete',
    gadgetWrapper: '.gadget'
  };

  browser
    .frameParent() // get back to the player iframe
    .waitForElementPresent(ui.gadgetDelete)
    // strange way to make the delete icon visible
    .click(ui.gadgetWrapper)
    .click(ui.gadgetDelete)
    .waitForElementPresent(ui.gadgetConfirmDelete)
    .click(ui.gadgetConfirmDelete)
    .waitForElementNotPresent(ui.gadgetInLesson)

  return browser;
}
