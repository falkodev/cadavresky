import React from 'react';
import RichTextEditor from 'react-rte';
import { sendData, connectionHandler } from './helpers/ajax';

let initialContent;

const EditableContent = React.createClass({
    getInitialState: function() {
        initialContent = this.props.initialContent;
        const editable = this.props.editable;
        return {
            value: RichTextEditor.createValueFromString(initialContent, 'html'),
            editMode: false,
            isLoading: false,
            hasError: false,
            editable: editable,
        };
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({
        value: RichTextEditor.createValueFromString(nextProps.initialContent, 'html'),
        editMode: false,
      });
    },
    editModeHandler: function() {
      this.setState({editMode:true});
    },
    cancelHandler: function() {
      this.setState({
        value: RichTextEditor.createValueFromString(initialContent, 'html'),
        editMode: false,
      });
    },
    saveHandler: function() {
      const data = this.state.value.toString('html');
      sendData(this, this.props.page, data);
      initialContent = data; //initialContent takes current RTE content, so if a cancel action occurs, this saved content will be displayed and not the real initialContent (that no longer exists in DB)
    },
    changeHandler: function(value) {
      if(this.state.editMode) {
        this.setState({value});
      }
    },
    render: function() {
        return (
          <div>
            { this.state.editable ?
              this.state.editMode ?
               <div>
                  <button onClick={ this.cancelHandler } className="btn btn-danger">Annuler</button>
                  <button onClick={ this.saveHandler } className="btn">Enregistrer</button>

                  {this.state.isLoading ?
                   <svg className="spinner spinner-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"></path>
                      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" transform="rotate(297.427 16 16)"></path>
                    </svg>:null}

                  {this.state.hasError ?
                    <div className="alert alert-danger alert-margin-10px" role="alert">
                      <button type="button" onClick={ () => this.setState({hasError:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>Problème d'enregistrement</strong>
                        <br />Un problème s'est produit lors de l'enregistrement en base de données
                        <br />C'est le moment de contacter ton informaticien préféré ;)
                    </div>:null}
                </div> :

               <div>
                <button onClick={ this.editModeHandler } className="btn">Editer</button>
                <button onClick={ () => location.reload() } className="btn btn-primary pull-right">Déconnexion</button>
               </div>
            : null }

            <div className={ this.state.editMode ?  "editor" : "" }> {/* affichage bordure en trait */}
              <RichTextEditor
                value={ this.state.value }
                onChange={ this.changeHandler }
                readOnly={ this.state.editMode ? false:true }
              />
            </div>
          </div>
        );
    }
});

export default EditableContent;
