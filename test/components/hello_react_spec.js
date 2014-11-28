var HelloReact = require('../../js/components/hello_react');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('HelloReact', function() {
  it('renders', function() {
    var component = TestUtils.renderIntoDocument(<HelloReact />);
    var foundComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'hello-react');
    foundComponent.should.exist();
  });
});
