var React = require('react');

var Name = React.createClass({
  getInitialState: function() { return {}; },

  renderInput: function() {
    return (
      <input
        ref="name"
        type="text"
        className="name"
        placeholder="Enter your name"
        onKeyUp={this.onKeyUp}
        defaultValue={this.props.name} />
    );
  },

  renderLabel: function() {
    return (
      <div className="name">
        {this.props.name}
      </div>
    );
  },

  render: function() {
    return this.props.editable ? this.renderInput() : this.renderLabel();
  },

  onKeyUp: function() {
    var name = this.refs.name.getDOMNode().value;
    this.props.onNameChange(name);
  },

  componentDidUpdate: function() {
    if (this.props.editable) {
      this.refs.name.getDOMNode().focus();
    }
  }
});

module.exports = Name;
