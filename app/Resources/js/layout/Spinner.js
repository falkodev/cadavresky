import React from 'react';

const Spinner = React.createClass({
  render: function() {
    return (
      <svg className={ this.props.alt ? "spinner spinner-alt" : "spinner" } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"></path>
        <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" transform="rotate(297.427 16 16)"></path>
      </svg>
    );
  }
});

export default Spinner;
