VersalPlayerAPI = require('../../versal/player');

var VersalGadgetMixin = {
  getInitialState: function() {
    return { editable: false };
  },

  componentWillMount: function() {
    this.player = new VersalPlayerAPI();

    // Retrigger on component if hooks exist
    this.player.on('attributesChanged', this._onAttributesChanged);
    this.player.on('learnerStateChanged', this._onLearnerStateChanged);
    this.player.on('editableChanged', this._onEditableChanged);
  },

  componentDidMount: function() {
    this.player.startListening();
    this.player.watchBodyHeight();
  },

  componentWillUnmount: function() {
    this.player.unwatchBodyHeight();

    this.player.off('attributesChanged', this._onAttributesChanged);
    this.player.off('learnerStateChanged', this._onLearnerStateChanged);
    this.player.off('editableChanged', this._onEditableChanged);
  },

  _onAttributesChanged: function(attributes) {
    if (this.attributesWillUpdate) {
      this.attributesWillUpdate(attributes);
    }
    this.setState(attributes);
    if (this.attributesDidUpdate) {
      this.attributesDidUpdate(attributes);
    }
  },

  _onLearnerStateChanged: function(learnerState) {
    if (this.learnerStateWillUpdate) {
      this.learnerStateWillUpdate(learnerState);
    }
    this.setState(learnerState);
    if (this.learnerStateDidUpdate) {
      this.learnerStateDidUpdate(learnerState);
    }
  },

  _onEditableChanged: function(editable) {
    if (this.editableWillUpdate) {
      this.editableWillUpdate(editable.editable);
    }
    this.setState(editable);
    if (this.editableDidUpdate) {
      this.editableDidUpdate(editable.editable);
    }
  }
};

module.exports = VersalGadgetMixin;
