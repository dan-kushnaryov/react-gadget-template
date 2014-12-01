var _ = require('underscore');
var React = require('react');
var Name = require('./name');

var HelloReact = React.createClass({
  renderAuthorName: function() {
    return (
      <Name
        className="authorName"
        name={this.props.authorName}
        editable={this.props.editable}
        onNameChange={this.props.onAuthorNameChange} />
    );
  },

  renderLearnerName: function() {
    return (
      <Name
        className="learnerName"
        name={this.props.learnerName}
        editable={!this.props.editable}
        onNameChange={this.props.onLearnerNameChange} />
    );
  },

  renderSmiles: function() {
    var smiles = _.reduce(_.range(this.props.numberOfSmiles), function(smilesString) {
      return smilesString + '(:';
    }, '');
    return (
      <span className="smiles">{smiles}</span>
    );
  },

  render: function() {
    var role = this.props.editable ? 'author' : 'learner';
    return (
      <div className="hello">
        <div>
          Hello ReactJs + Versal!
          <span className="role">{role}</span>
        </div>
        <hr />
        <div>
          Author: {this.renderAuthorName()}
        </div>
        <div className="smiles">{this.renderSmiles()}</div>
        <div>
          Learner: {this.renderLearnerName()}
        </div>
      </div>
    );
  }
});

module.exports = HelloReact;
