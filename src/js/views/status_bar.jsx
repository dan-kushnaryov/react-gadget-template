var React = require('react');
var Status = require('./status');

var Stats = React.createClass({
  render: function() {
    return (
      <div>
       <Status.Wpm />
       <Status.Corrections />
       <Status.Words />
      </div>
    );
  }
});

module.exports = Stats;
