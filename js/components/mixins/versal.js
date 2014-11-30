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
    // Give component an opportunity to work with the
    // next value before update.
    if (this.attributesWillUpdate) {
      this.attributesWillUpdate(attributes);
    }
    this.setState(attributes);
  },

  _onLearnerStateChanged: function(learnerState) {
    // Give component an opportunity to work with the
    // next value before update.
    if (this.learnerStateWillUpdate) {
      this.learnerStateWillUpdate(learnerState);
    }
    this.setState(learnerState);
  },

  _onEditableChanged: function(editable) {
    // Give component an opportunity to work with the
    // next value before update.
    if (this.editableWillUpdate) {
      this.editableWillUpdate(editable.editable);
    }
    this.setState(editable);
  }
};

module.exports = VersalGadgetMixin;
