var React = require('react');
console.log(React);
var VersalPlayerAPI = require('./player');

// This module is all about creating a global player instance
// and, when it's ready, render the react component the "normal"
// way. The component will use the player mixin to get lifecyle
// events from the same player instance

// Here's the global player
var player = global.player = new VersalPlayerAPI();

var ReactGadget = {
  render: function(component, rootElement) {
    var React = require('react');
    React.render(component, rootElement);
  }
};

module.exports = ReactGadget;
