var React = require('react');
var VersalGadgetMixin = require('./mixins/versal_gadget');

var HelloReact = React.createClass({
  mixins: [VersalGadgetMixin],

  render: function() {
    return (
      <div>
        Hello react!
      </div>
    );
  }
});

module.exports = HelloReact;
