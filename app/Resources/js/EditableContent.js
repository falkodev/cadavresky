import React from 'react';
import RichTextEditor from 'react-rte';
import Spinner from './Layout/Spinner';
import { sendData } from './helpers/ajax';
import { subscribe } from './helpers/pubsub';

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
    blurText: function() {
      const paragraphs = document.getElementById('main').querySelectorAll('[class*=RichTextEditor__paragraph___]');
      if(paragraphs.length > 0) {
        if(!this.state.editMode) {
          paragraphs[0].classList.add('blur');
          paragraphs[paragraphs.length - 1].classList.add('blur');
        } else {
          paragraphs[0].classList.remove('blur');
          paragraphs[paragraphs.length - 1].classList.remove('blur');
        }
      }

    },
    componentDidMount: function() {
      this.blurText();
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({
        value: RichTextEditor.createValueFromString(nextProps.initialContent, 'html'),
        editMode: false,
      });
    },
    componentDidUpdate: function(prevProps, prevState) {
      this.blurText();
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
      sendData(this, this.props.page, data, this.props.language);
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

                  { this.state.isLoading ? <Spinner alt="true" /> : null }

                  { this.state.hasError ?
                    <div className="alert alert-danger alert-margin-10px" role="alert">
                      <button type="button" onClick={ () => this.setState({hasError:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>Problème d'enregistrement</strong>
                        <br />Un problème s'est produit lors de l'enregistrement en base de données
                        <br />C'est le moment de contacter ton informaticien préféré ;)
                    </div> : null }
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
