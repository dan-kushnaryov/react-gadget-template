var _ = require('underscore');
var React = require('react');
var HelloReact = require('./components/hello_react');
var GadgetControllerMixin = require('react-gadget-controller');

// This is an incubator. Some things can be extracted up
// into the mixin. It's the place where where we set attributes
// on the app.
// Currently this is also where events are handled that result
// in interactions with the player. Unsure how this should
// work. Probably Flux would wash this away.

var GadgetController = React.createClass({
  mixins: [GadgetControllerMixin],

  getDefaultAttributes: function() {
    return {
      numberOfSmiles: 3
    };
  },

  getPropertySheetAttributes: function() {
    return {
      numberOfSmiles: { type: 'Select',
        options: [1, 2, 3, 4]
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

    return (
      <HelloReact
        {...this.state}
        onAuthorNameChange={this.onAuthorNameChange}
        onLearnerNameChange={this.onLearnerNameChange} />
    );
  }
});

React.render(
  <GadgetController />,
  document.getElementById('app')
);
