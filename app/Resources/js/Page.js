import React from 'react';
import EditableContent from './EditableContent';
import Spinner from './Layout/Spinner';
import ProjectFolder from './ProjectFolder';
import { Button, Glyphicon } from 'react-bootstrap';
import { loadData, addFolder, getFolders } from './helpers/ajax';
import { subscribe } from './helpers/pubsub';

const Page = React.createClass({
  getInitialState: function() {
    subscribe("languageChanged", (language) => {
      this.setState({
        isLoading: true,
        language: language,
      });
      loadData(this, this.props.page, language);
    });

    const isAdminLoggedIn = this.props.isAdminLoggedIn;

    if (this.props.project) {
      this.listFolders(this.props.page);
    }

    return {
      isLoading: true,
      isRequesting: false,
      content: null,
      isAdminLoggedIn: isAdminLoggedIn,
      showInput: false, // afficher l'input pour le nom de projet à créer
      showErrorEmpty: false,
      showErrorCreation: false,
      showFolderCreationSuccess: false,
      newFolder: null,
      folders: null,
      language: (window.navigator.userLanguage||window.navigator.language).substr(0,2),
    };
  },
  componentDidMount: function() { //1ere fois que la page est chargée avec un composant (ex: who's who = page 2)
    loadData(this, this.props.page, this.state.language);
  },
  componentWillReceiveProps: function(nextProps, nextContext) { //changement de page -> la page est chargée avec un nouveau composant (ex: projectology = page 3)
    if (nextProps.project) {
      this.listFolders(nextProps.page);
    } else {
      this.setState({
        folders: null,
      });
    }

    this.setState({
      isLoading: true,
    });
    loadData(this, nextProps.page, this.state.language);
  },
  listFolders: function(page) {
    getFolders(this, page);
  },
  handleClick: function() {
    this.setState({
      showInput: true,
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const newFolder = new FormData(document.querySelector('form')).get('folder');

    if(newFolder) {
      this.setState({
        showErrorEmpty: false,
        showErrorCreation: false,
        isRequesting: true,
      });
      addFolder(this, this.props.page, newFolder);
    } else {
      this.setState({ showErrorEmpty: true });
    }
  },
  contextTypes: {
    language: React.PropTypes.string
  },
  render: function() {
      return (
        <div>
          { this.state.isLoading ?
            <Spinner />:
            <div>
              <EditableContent initialContent={ this.state.content } page={ this.props.page } editable={ this.state.isAdminLoggedIn } language={ this.state.language } />

              { this.props.project ? <Button onClick={ this.handleClick } style={{ marginTop:'15px', marginBottom:'15px' }}>Ajouter projet <Glyphicon glyph="plus" /></Button> : null }

              { this.state.showInput ?
                <form onSubmit={ this.handleSubmit }>
                  <div className="form-group">
                    <input name="folder" type="text" className="form-control" placeholder="Nom projet" />
                  </div>
                  <Button type="submit">Valider</Button>

                  { this.state.isRequesting ?
                   <Spinner alt="true" /> : null }

                </form> : null }

              { this.state.showErrorEmpty ?
                <div className="alert alert-danger alert-margin-10px" role="alert">
                  <button type="button" onClick={ () => this.setState({showErrorEmpty:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>Nom invalide</strong>
                    <br />Le nom de projet ne peut pas être vide
                </div> : null }

              { this.state.showErrorCreation ?
                <div className="alert alert-danger alert-margin-10px" role="alert">
                  <button type="button" onClick={ () => this.setState({showErrorCreation:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>Erreur de création</strong>
                    <br />Ce nom de projet est déjà utilisé ou il y a un problème sur le serveur
                </div> : null }

              { this.state.showFolderCreationSuccess ?
                <div className="alert alert-success alert-margin-10px" role="alert">
                  <button type="button" onClick={ () => this.setState({showFolderCreationSuccess:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <strong>Projet créé</strong>
                    <br />Le projet {this.state.newFolder} a bien été créé
                </div> : null }

              { this.state.folders ?
                <div>
                { this.state.folders.map((folder) => {
                  return <ProjectFolder key={folder} folder={folder} page={this.props.page} />
                }) }
                </div> : null }
            </div>
          }
        </div>
      );
  }
});

export default Page;

//              {this.props.project ? <ProjectPreview project={ this.props.project } editable={ this.state.isAdminLoggedIn } /> : null}
