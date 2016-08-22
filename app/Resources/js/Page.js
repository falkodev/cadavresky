import React from 'react';
import EditableContent from './EditableContent';
import { loadHandler } from './helpers/ajax';

const Page = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      content: null
    };
  },
  componentDidMount: function() { //1ere fois que la page est chargée avec un composant (sex: who's who = page 2)
    loadData(this, this.props.page);
  },
  componentWillReceiveProps: function(nextProps) { //changement de page -> la page est chargée avec un nouveau composant (ex: projectology = page 3)
    loadData(this, nextProps.page);
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
