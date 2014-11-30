var React = require('react');

var Name = React.createClass({

  render: function() {
    var nameTag;
    if (this.props.editable) {
      nameTag = (
        <input
          ref="name"
          type="text"
          className="name"
          onKeyUp={this.onKeyUp}
          defaultValue={this.props.name} />
      );
    } else {
      nameTag = (
        <div className="name">
          {this.props.name}
        </div>
      );
    }
    return nameTag;
  },

  onKeyUp: function() {
    var name = this.refs.name.getDOMNode().value;
    this.props.onNameChange(name);
  }
});

module.exports = Name;
