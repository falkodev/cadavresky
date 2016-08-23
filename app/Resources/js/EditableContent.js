import React from 'react';
import RichTextEditor from 'react-rte';

const EditableContent = React.createClass({
    getInitialState: function() {
        const initialContent = this.props.initialContent;

        return {
            value: RichTextEditor.createValueFromString(initialContent, 'html'),
            editMode: false,
        };
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({
        value: RichTextEditor.createValueFromString(nextProps.initialContent, 'html'),
        editMode: false,
      });
    },
    onChange: function(value) {
      if(this.state.editMode) {
        this.setState({value});
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
                <button className="btn">Enregistrer</button>
              </div> :
             <button onClick={ () => this.setState({editMode:true}) } className="btn">Editer</button>
            }
            <div className={ this.state.editMode ?  "editor" : "" }> {/* affichage bordure en trait */}
              <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
              />
            </div>
          </div>
        );
    }
});

export default EditableContent;
