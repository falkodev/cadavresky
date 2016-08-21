import React from 'react';
import EditableContent from './EditableContent';

const Page = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      content: null
    };
  },
  componentDidMount: function() {
    this.props.onLoad(this, this.props.page);
  },
  componentWillReceiveProps: function(nextProps) {
    this.props.onLoad(this, nextProps.page);
  },
  render: function() {
      return (
        <div>
          {this.state.isLoading ?
           <svg id="spinner" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"></path>
              <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" transform="rotate(297.427 16 16)"></path>
            </svg>:
           <EditableContent initialContent={ this.state.content } />}
        </div>
      );
  }
});

export default Page;
