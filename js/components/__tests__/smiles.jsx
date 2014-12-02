var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../smiles');
jest.dontMock('underscore');
var Smiles = require('../smiles');

var findComponentByClass = TestUtils.findRenderedDOMComponentWithClass;
var renderComponent = TestUtils.renderIntoDocument;

describe('Smiles', function() {
  it('should render', function() {
    var smiles = renderComponent(<Smiles numberOfSmiles={3} />);
    var foundSmiles = findComponentByClass(smiles, 'smiles');
    expect(foundSmiles).toBeDefined();
  });

  it('should show the correct number of smiles', function() {
    var smiles = renderComponent(<Smiles numberOfSmiles={3} />);
    expect(smiles.getDOMNode().textContent).toEqual('(:(:(:');

    var smiles = renderComponent(<Smiles numberOfSmiles={2} />);
    expect(smiles.getDOMNode().textContent).toEqual('(:(:');

    var smiles = renderComponent(<Smiles numberOfSmiles={1} />);
    expect(smiles.getDOMNode().textContent).toEqual('(:');
  });
});

