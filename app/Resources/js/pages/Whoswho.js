import React from 'react';
import EditableContent from './EditableContent';

const WhosWho = React.createClass({
  getInitialState: function() {
    return {
      content: null
    };
  },
  componentDidMount: function() {
    this.props.onAjax(this, 2);
  },
  render: function() {
      return (
        <div>
          <EditableContent initialContent={ this.state.content } />
        </div>
      );
  }
});

export default WhosWho;
