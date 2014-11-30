var React = require('react');

var Name = React.createClass({
  render: function() {
    var nameTag;
    if (this.props.editable) {
      nameTag = <input type="text" className="name">{this.props.name}</input>;
    } else {
      nameTag = <div className="name">{this.props.name}</div>;
    }
    return nameTag;
  }
});

module.exports = Name;
