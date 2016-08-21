import React from 'react';

const Projectology = React.createClass({
  getInitialState: function() {
    return {
      content: null
    };
  },
  componentDidMount: function() {
    this.props.onAjax(this, 3);
  },
  render: function() {
    return (
      <div>
        { this.state.content }
      </div>
    );
  }
});

export default Projectology;
