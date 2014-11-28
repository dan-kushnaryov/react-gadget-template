var _ = require('underscore');
var React = require('react');
var Texts = require('../content/texts');

var ControlBar = require('./control_bar.jsx');
var Lines = require('./lines.jsx');
var StatusBar = require('./status_bar.jsx');
var Overlay = require('./overlay.jsx');

var TypingTest = React.createClass({

  getInitialState: function() {
    return { duration: 60 };
  },

  render: function() {
    var text = _.first(Texts.songs);

    return (
      <div ref="typingTest">
        <ControlBar
          onTimerStart={this.onTimerStart}
          onTimerEnd={this.onTimerEnd}
          duration={this.state.duration} />
        <Lines text={text} />
        <StatusBar />
        <Overlay />
      </div>
    );
  },

  onTimerStart: function() {
    console.log('start');
    this.refs.typingTest.getDOMNode().focus();
  },

  onTimerEnd: function() {
    console.log('end');
  }

});

module.exports = TypingTest;
