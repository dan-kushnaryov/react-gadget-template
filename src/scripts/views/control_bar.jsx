var React = require('react');
var Status = require('./status');
var Timer = require('./timer');

var ControlBar = React.createClass({
  render: function() {
    return (
      <div>
       <Timer
         duration={this.props.duration}
         onStart={this.props.onTimerStart}
         onEnd={this.props.onTimerEnd} />
       <Status.Score />
      </div>
    );
  },
});

module.exports = ControlBar;
