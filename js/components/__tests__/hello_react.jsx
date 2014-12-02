var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../../mixins/versal');
jest.dontMock('../hello_react');
var HelloReact = require('../hello_react');

var findComponent = TestUtils.findRenderedDOMComponentWithClass;
var renderComponent = TestUtils.renderIntoDocument;

describe('HelloReact', function() {

  it('should render', function() {
    var hello = renderComponent(<HelloReact />);
    var foundHello = findComponent(hello, 'hello-react');
    expect(foundHello).toBeDefined();
  });

  it('should indicate learner role', function() {
    var hello = renderComponent(<HelloReact />);
    var foundRole = findComponent(hello, 'role');
    expect(foundRole.getDOMNode().textContent).toEqual('learner');
  });

  describe('when editable', function() {
    it('should indicate author role', function() {
      var hello = renderComponent(<HelloReact />);
      var foundRole = findComponent(hello, 'role');
      hello.props.editable = true;
      hello.forceUpdate();
      expect(foundRole.getDOMNode().textContent).toEqual('author');
    });
  });
});
