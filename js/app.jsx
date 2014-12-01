var _ = require('underscore');
var React = require('react');
var HelloReact = require('./components/hello_react');
var VersalGadgetMixin = require('./mixins/versal');

// This is an incubator. Some things can be extracted up
// into the mixin. It's the place where where we set attributes
// on the app.

var HelloReactController = React.createClass({
  mixins: [VersalGadgetMixin],

  getPropertySheetAttributes: function() {
    return {
      numberOfSmiles: { type: 'Select',
        options: [1, 2, 3]
      }
    };
  },

  onAuthorNameChange: function(authorName) {
    this.player.setAttributes({ authorName: authorName });
  },

  onLearnerNameChange: function(learnerName) {
    this.player.setLearnerState({ learnerName: learnerName });
  },

  render: function() {
    if (!this.state.ready) {
      return null;
    }

    var callbacks = _.pick(this, [
      'onAuthorNameChange',
      'onLearnerNameChange'
    ]);

    var props = _.extend({}, this.state, callbacks);

    return <HelloReact {...props} />;
  }
});

React.render(
  <HelloReactController />,
  document.getElementById('app')
);
