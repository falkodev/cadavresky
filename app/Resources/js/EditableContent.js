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
            { this.state.editMode ?
             <div>
                {/* voir si methode dans draft.js pour garder l'état initial, sinon enregistrer l'état au moment du clic sur "Editer" */}
                <button onClick={ () => this.setState({editMode:false}) } 
                  className="btn btn-danger">Annuler</button>
                <button className="btn btn-success">Enregistrer</button>
              </div> :
             <button onClick={ () => this.setState({editMode:true}) } className="btn">Editer</button> 
            }
            <div className={ this.state.editMode ?  "editor" : "" }> {/* affichage bordure en trait */}
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
