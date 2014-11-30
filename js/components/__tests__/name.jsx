var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../name');
var Name = require('../name');

var findComponentByClass = TestUtils.findRenderedDOMComponentWithClass;
var findComponentByTag = TestUtils.findRenderedDOMComponentWithTag;
var renderComponent = TestUtils.renderIntoDocument;

describe('Name', function() {

  it('should render', function() {
    var name = renderComponent(<Name />);
    var foundName = findComponentByClass(name, 'name');
    expect(foundName).toBeDefined();
  });

  it('should show the name', function() {
    var name = renderComponent(<Name name="Lulu" />);
    var foundName = findComponentByClass(name, 'name');
    expect(foundName.getDOMNode().textContent).toEqual('Lulu');
  });

  describe('when editable', function() {
    it('should make the name editable', function() {
      var name = renderComponent(<Name editable={true} name="Lulu" />);
      var foundName = findComponentByTag(name, 'input');
      expect(foundName).toBeDefined();
    });
  });
});
