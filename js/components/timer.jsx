var React = require('react');

var timeFormat = function(seconds) {
  var minute = 60;
  minutes = Math.floor(seconds / minute);
  seconds = seconds - minutes * minute;

  // pad units
  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10) minutes = '0' + minutes;

  return minutes + ':' + seconds;
};

var Timer = React.createClass({

  getInitialState: function() {
    return {
      elapsed: 0,
      running: false
    };
  },

  render: function() {
    var buttonLabel = this.state.running ? 'restart' : 'start';
    return (
      <div>
        <div>{timeFormat(this.getSecondsRemaining())}</div>
        <button onClick={this.onStart}>{buttonLabel}</button>
      </div>
    );
  },

  onStart: function() {
    if (this.state.running) {
      this.props.onEnd();
    }

    this.props.onStart();
    this.startTimerAt(0);
  },

  getSecondsRemaining: function() {
    return this.props.duration - this.state.elapsed;
  },

  tick: function() {
    var elapsed = this.state.elapsed + 1;

    if (elapsed <= this.props.duration) {
      this.startTimerAt(elapsed);
    }

    if (elapsed >= (this.props.duration + 1)) {
      this.props.onEnd();
      this.setState({ running: false });
    }
  },

  startTimerAt: function(elapsed) {
    clearTimeout(this.timeout);

    this.setState({ elapsed: elapsed, running: true }, function() {
      this.timeout = setTimeout(this.tick, 1000);
    });
  }

});

module.exports = Timer;
