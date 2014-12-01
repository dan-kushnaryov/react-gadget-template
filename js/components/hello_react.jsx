var React = require('react');
var VersalGadgetMixin = require('./mixins/versal');

var Name = require('./name');

var HelloReact = React.createClass({
  mixins: [VersalGadgetMixin],

  onNameChange: function(name) {
    this.player.setAttributes({ name: name });
  },

  render: function() {
    var role = this.state.editable ? 'author' : 'learner';
    return (
      <div className="hello">
        <div>
          Hello ReactJs + Versal!
          <span className="role">{role}</span>
        </div>
        <hr />
        <div>
          Author: <Name
                    name={this.state.name}
                    editable={this.state.editable}
                    onNameChange={this.onNameChange} />
        </div>
      </div>
    );
  }
});

module.exports = HelloReact;
