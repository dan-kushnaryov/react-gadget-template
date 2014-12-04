var _ = require('underscore');
var VersalPlayerAPI = require('versal_player_api');

var VersalGadgetMixin = {
  getInitialState: function() {
    return { ready: false };
  },

  componentWillMount: function() {
    this.player = new VersalPlayerAPI();

    this._debouncePlayerSetters();

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

  _debouncePlayerSetters: function() {
    this.player.setAttributes = _.debounce(this.player.setAttributes.bind(this.player), 200);
    this.player.setLearnerState = _.debounce(this.player.setLearnerState.bind(this.player), 200);
  },

  _onAttributesChanged: function(attributes) {
    this.setState(attributes);

    if (!this._attributesSet) {
      this._attributesSet = true;
      this._maybeReady();
      this._persistDefaultAttributes();
    }
  },

  _onLearnerStateChanged: function(learnerState) {
    this.setState(learnerState);

    if (!this._learnerStateSet) {
      this._learnerStateSet = true;
      this._maybeReady();
      this._persistDefaultLearnerState();
    }
  },

  _onEditableChanged: function(editable) {
    this.setState(editable);

    if (!this._editableSet) {
      this._editableSet = true;
      this._maybeReady();
    }
  },

  _getDefaultAttributes: function() {
    if (this.getDefaultAttributes) {
      return this.getDefaultAttributes();
    } else {
      return {};
    }
  },

  _getDefaultLearnerState: function() {
    if (this.getDefaultLearnerState) {
      return this.getDefaultLearnerState();
    } else {
      return {};
    }
  },

  _persistDefaultAttributes: function() {
    if (this.getDefaultAttributes) {
      var defaults = this.getDefaultAttributes();
      var unsavedDefaults = _.reduce(defaults, function(unsaved, val, key) {
        if (!this.state[key]) {
          unsaved[key] = val;
        }
        return unsaved;
      }, {}, this);
      this.player.setAttributes(unsavedDefaults);
    }
  },

  _persistDefaultLearnerState: function() {
    if (this.getDefaultLearnerState) {
      var defaults = this.getDefaultLearnerState();
      var unsavedDefaults = _.reduce(defaults, function(unsaved, val, key) {
        if (!this.state[key]) {
          unsaved[key] = val;
        }
        return unsaved;
      }, {}, this);
      this.player.setLearnerState(unsavedDefaults);
    }
  },

  _maybeReady: function() {
    if (!this.state.ready && this._editableSet && this._learnerStateSet && this._attributesSet) {
      var state = _.extend({}, this.state, { ready: true });
      state = _.defaults(state, this._getDefaultAttributes(), this._getDefaultLearnerState());
      this.setState(state);
    }
    this.initializePropertySheets();
  }
};

module.exports = VersalGadgetMixin;
