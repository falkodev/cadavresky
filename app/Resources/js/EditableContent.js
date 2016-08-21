import React from 'react';
import {Editor, EditorState, ContentState, convertFromHTML} from 'draft-js';

const EditableContent = React.createClass({
    getInitialState: function() {
        const initialContent = this.props.initialContent;

        return {
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(initialContent))),
            editMode: false,
        };
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({
        editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(nextProps.initialContent))),
        editMode: false,
      });
    },
    onChange: function(editorState) {
      if(this.state.editMode) {
        this.setState({editorState});
      }
    },
    render: function() {
        return (
          <div>
            <button onClick={ () => this.setState({editMode:!this.state.editMode}) }>{ this.state.editMode ?  "Annuler" : "Editer" }</button>
            <div className={ this.state.editMode ?  "editor" : "" }>
              <Editor
                editorState={ this.state.editorState }
                onChange={ this.onChange }
              />
            </div>
          </div>
        );
    }
});

export default EditableContent;
