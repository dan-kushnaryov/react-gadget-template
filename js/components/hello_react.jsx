var _ = require('underscore');
var React = require('react');
var Name = require('./name');
var Smiles = require('./smiles');

var HelloReact = React.createClass({

  propTypes: {
    numberOfSmiles: React.PropTypes.number.isRequired,
    editable: React.PropTypes.bool.isRequired,
    onAuthorNameChange: React.PropTypes.func.isRequired,
    onLearnerNameChange: React.PropTypes.func.isRequired,
  },

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

  render: function() {
    var role = this.props.editable ? 'author' : 'learner';
    return (
      <div className="hello-react">
        <div>
          Hello ReactJs + Versal!
          <span className="role">{role}</span>
        </div>
        <hr />
        <div>
          Author: {this.renderAuthorName()}
        </div>
        <Smiles numberOfSmiles={this.props.numberOfSmiles} />
        <div>
          Learner: {this.renderLearnerName()}
        </div>
      </div>
    );
  }
});

module.exports = HelloReact;
