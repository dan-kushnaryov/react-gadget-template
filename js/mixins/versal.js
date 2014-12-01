VersalPlayerAPI = require('../versal/player');

var VersalGadgetMixin = {
  getInitialState: function() {
    return { ready: false };
  },

  componentWillMount: function() {
    this.player = new VersalPlayerAPI();
    this.initializePropertySheets();

    this.player.on('attributesChanged', this._onAttributesChanged);
    this.player.on('learnerStateChanged', this._onLearnerStateChanged);
    this.player.on('editableChanged', this._onEditableChanged);
  },

  initializePropertySheets: function() {
    if (this.getPropertySheetAttributes) {
      var attributes = this.getPropertySheetAttributes();
      this.player.setPropertySheetAttributes(attributes);
    }
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
    this.setState(attributes);
    if (this._attributesSet) {
      return;
    }
    this._attributesSet = true;
    this._maybeReady();
  },

  _onLearnerStateChanged: function(learnerState) {
    this.setState(learnerState);
    if (this._learnerStateSet) {
      return;
    }
    this._learnerStateSet = true;
    this._maybeReady();
  },

  _onEditableChanged: function(editable) {
    this.setState(editable);
    if (this._editableSet) {
      return;
    }
    this._editableSet = true;
    this._maybeReady();
  },

  _maybeReady: function() {
    if (!this.state.ready && this._editableSet && this._learnerStateSet && this._attributesSet) {
      this.setState({ ready: true });
    }
  }
};

module.exports = VersalGadgetMixin;
