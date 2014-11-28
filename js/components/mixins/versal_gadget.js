var VersalGadgetMixin = {
  getInitialState: function() {
    return { editable: false };
  },

  componentWillMount: function() {
    this.player = new VersalPlayerAPI();

    // Save everything to the component's state
    this.player.on('attributesChanged', this._setState);
    this.player.on('learnerStateChanged', this._setState);
    this.player.on('editableChanged', this._setState);

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

    this.player.off('attributesChanged', this._setState);
    this.player.off('learnerStateChanged', this._setState);
    this.player.off('editableChanged', this._setState);

    this.player.off('attributesChanged', this._onAttributesChanged);
    this.player.off('learnerStateChanged', this._onLearnerStateChanged);
    this.player.off('editableChanged', this._onEditableChanged);
  },

  _onAttributesChanged: function() {
    if (this.attributesDidChange) {
      this.attributesDidChange.apply(this, arguments);
    }
  },
  _onLearnerStateChanged: function() {
    if (this.learnerStateDidChange) {
      this.learnerStateDidChange.apply(this, arguments);
    }
  },
  _onEditableChanged: function() {
    if (this.editableDidChange) {
      this.editableDidChange.apply(this, arguments);
    }
  },

  _setState: function() {
    this.setState.apply(this, arguments);
  }
};

module.exports = VersalGadgetMixin;
