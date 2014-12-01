var React = require('react');

var Name = React.createClass({
  getDefaultProps: function() {
    return {
      name: 'Anonymous'
    };
  },

  renderInput: function() {
    if (!this.props.name) {
      return null;
    }

    return (
      <input
        className={this.props.className}
        ref="name"
        type="text"
        placeholder="Enter your name"
        onKeyUp={this.onKeyUp}
        defaultValue={this.props.name} />
    );
  },

  renderLabel: function() {
    return (
      <div className={this.props.className}>
        {this.props.name}
      </div>
    );
  },

  render: function() {
    return this.props.editable ? this.renderInput() : this.renderLabel();
  },

  onKeyUp: function() {
    var name = this.refs.name.getDOMNode().value;
    if (name != this.props.name) {
      this.props.onNameChange(name);
    }
  },

  componentDidMount: function() {
    if (this.props.editable) {
      this.refs.name.getDOMNode().focus();
    }
  },

  componentDidUpdate: function() {
    if (this.props.editable) {
      this.refs.name.getDOMNode().focus();
    }
  }
});

module.exports = Name;
