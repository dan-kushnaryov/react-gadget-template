var React = require('react');

var Timer = React.createClass({
  render: function() {
    return (
      <div>
       <div>00:00</div>
       <button onClick={this.onStart}>start</button>
      </div>
    );
  },
  onStart: function() {
    alert(123);
  }
});

module.exports = Timer;
