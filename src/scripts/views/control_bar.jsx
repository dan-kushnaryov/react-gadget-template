var React = require('react');
var Status = require('./status');
var Timer = require('./timer');

var ControlBar = React.createClass({
  render: function() {
    return (
      <div>
       <Timer />
       <Status.Score />
      </div>
    );
  }
});

module.exports = ControlBar;
