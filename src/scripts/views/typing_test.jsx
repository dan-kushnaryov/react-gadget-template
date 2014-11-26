var _ = require('underscore');
var React = require('react');
var Texts = require('../texts');

var ControlBar = require('./control_bar.jsx');
var Lines = require('./lines.jsx');
var StatusBar = require('./status_bar.jsx');
var Overlay = require('./overlay.jsx');

var TypingTest = React.createClass({
  render: function() {
    var text = _.first(Texts.songs);
    return (
      <div>
        <ControlBar />
        <Lines text={text} />
        <StatusBar />
        <Overlay />
      </div>
    );
  }
});

module.exports = TypingTest;
