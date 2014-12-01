var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../name');
var Name = require('../name');

var findComponentByClass = TestUtils.findRenderedDOMComponentWithClass;
var findComponentByTag = TestUtils.findRenderedDOMComponentWithTag;
var renderComponent = TestUtils.renderIntoDocument;
var simulate = TestUtils.Simulate;

describe('Name', function() {

  it('should render', function() {
    var name = renderComponent(<Name />);
    var foundName = findComponentByClass(name, 'name');
    expect(foundName).toBeDefined();
  });

  it('should show the default name', function() {
    var name = renderComponent(<Name />);
    expect(name.getDOMNode().textContent).toEqual('Anonymous');
  });

  it('should show the specified name', function() {
    var name = renderComponent(<Name name="Lulu" />);
    expect(name.getDOMNode().textContent).toEqual('Lulu');
  });

  describe('when editable', function() {
    it('should make the name editable', function() {
      var name = renderComponent(<Name editable={true} name="Lulu" />);
      // If there's a text input that should be sufficient
      var foundNameInput = findComponentByTag(name, 'input');
      expect(foundNameInput).toBeDefined();
    });

    it('should focus on the editable name', function(done) {
      var name = renderComponent(<Name editable={true} name="Lulu" />);
      expect(name.getDOMNode()).toEqual(document.activeElement);
    });

    describe('when the name changes', function(){
      var onNameChangeMock = jest.genMockFunction();

      var name = renderComponent(
        <Name onNameChange={onNameChangeMock}
              editable={true}
              name="Lulu" />
      );
      var foundNameInput = findComponentByTag(name, 'input');
      var nameInputEl = foundNameInput.getDOMNode();

      // Simulate typing an s into the input
      // TODO would be nice if we didn't have to know
      // so much about the implementation to test this.
      var addCharacter = 's';
      nameInputEl.value = nameInputEl.value + addCharacter;
      simulate.keyUp(nameInputEl, {key: addCharacter});

      var firstCall = onNameChangeMock.mock.calls[0];
      var firstArgument = firstCall[0];
      expect(firstArgument).toEqual('Lulus');
    });
  });

  describe('when becoming editable', function() {
    it('should focus on the editable name', function(done) {
      var name = renderComponent(<Name editable={false} name="Lulu" />);
      name.props.editable = true;
      name.forceUpdate();
      expect(name.getDOMNode()).toEqual(document.activeElement);
    });
  });
});
