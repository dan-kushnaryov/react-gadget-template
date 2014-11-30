var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../mixins/versal.js');
jest.dontMock('../hello_react.jsx');
var HelloReact = require('../hello_react.jsx');

// TODO Decide what to do about this. Ideally the player API
// is available as a CommonJs module and we can do a manual
// mock to get the right behavior.
VersalPlayerAPI = function() {};
VersalPlayerAPI.prototype.on = function() {};
VersalPlayerAPI.prototype.startListening = function() {};
VersalPlayerAPI.prototype.watchBodyHeight = function() {};

var findComponent = TestUtils.findRenderedDOMComponentWithClass;
var renderComponent = TestUtils.renderIntoDocument;

describe('HelloReact', function() {

  it('should render', function() {
    var hello = renderComponent(<HelloReact />);
    var foundHello = findComponent(hello, 'hello');
    expect(foundHello).toBeDefined();
  });

  it('should indicate the user is a learner', function() {
    var hello = renderComponent(<HelloReact />);
    var foundRole = findComponent(hello, 'role');
    expect(foundRole.getDOMNode().textContent).toEqual('learner');
  });

  describe('when editable', function() {
    it('should indicate the user is an author', function() {
      var hello = renderComponent(<HelloReact />);
      var foundRole = findComponent(hello, 'role');
      hello.setState({ editable: true });
      expect(foundRole.getDOMNode().textContent).toEqual('author');
    });
  });
});
