var React = require('react');

var Lines = React.createClass({
  render: function() {
    return <div>{this.props.text}</div>;
  }
});

module.exports = Lines;
