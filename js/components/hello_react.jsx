var React = require('react');
var VersalGadgetMixin = require('./mixins/versal_gadget');

var HelloReact = React.createClass({
  mixins: [VersalGadgetMixin],

  render: function() {
    var role = this.state.editable ? 'author' : 'learner';
    return (
      <div>
        Hello ReactJs + Versal! <span className="role">{role}</span>
      </div>
    );
  }
});

module.exports = HelloReact;
