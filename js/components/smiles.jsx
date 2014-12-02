var _ = require('underscore');
var React = require('react');

// Because we all know you're a sociopath if you
// don't smile when you say hello.

var Smiles = React.createClass({

  propTypes: {
    numberOfSmiles: React.PropTypes.number.isRequired
  },

  render: function() {
    var smiles = _.reduce(_.range(this.props.numberOfSmiles), function(smilesString) {
      return smilesString + '(:';
    }, '');
    return (
      <span className="smiles">{smiles}</span>
    );
  }
});

module.exports = Smiles;
