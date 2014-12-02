var React = require('react');

var Name = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    editable: React.PropTypes.bool.isRequired,
    onNameChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      name: 'Anonymous'
    };
  },

  renderInput: function() {
    if (!this.props.name) {
      return null;
    }

    var className = 'name ' + this.props.className;

    return (
      <input
        className={className}
        ref="name"
        type="text"
        placeholder="Enter your name"
        onKeyUp={this.onKeyUp}
        defaultValue={this.props.name} />
    );
  },

  renderLabel: function() {
    var className = 'name ' + this.props.className;

    return (
      <div className={className}>
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
