import React from 'react';
import Dropzone from 'react-dropzone';
import { Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';
import { uploadFiles, getMedias, deleteFile } from './helpers/ajax';

const ProjectFolder = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      showModal: false,
    };
  },
  openModal: function() {
    this.setState({
      showModal: true,
    });
    getMedias(this, this.props.page, this.props.folder);
  },
  handleDrop: function (files, e) {
    let progressBar;

    if (e.currentTarget.parentNode.id === 'dropzone-cover1') {
      this.setState({
        cover1: files,
        cover1Progress: true
      });
      progressBar = 'barCover1';
    } else if (e.currentTarget.parentNode.id === 'dropzone-cover2') {
      this.setState({
        cover2: files,
        cover2Progress: true
      });
      progressBar = 'barCover2';
    } else {
      this.setState({
        medias: files,
        mediasProgress: true
      });
      progressBar = 'barMedias';
    }

    const data = new FormData();
    for(let i=0; i < files.length; i++) {
      data.append('files[]', files[i]);
    }

    uploadFiles(this, this.props.page, this.props.folder, data, progressBar);
  },
  handleMediaRemove: function(e) {
    const nameFileToRemove = e.currentTarget.id.split('remove')[1];

    if(window.confirm('Suppression de ' + nameFileToRemove + ' ?')) {
      deleteFile(this, e.currentTarget.dataset.path);
    }
  },
  render: function() {
    const close = () => this.setState({ showModal: false});
    const plus = <Button bsSize="large" className="btn-info addable"><Glyphicon glyph="plus" /></Button>;
    const plusCover = <Button bsSize="large" className="btn-info addable addable-cover"><Glyphicon glyph="plus" /></Button>;
    const plusCoverAdded = <Button bsSize="large" className="btn-info addable addable-cover added"><Glyphicon glyph="plus" /></Button>;
    const plusAdded = <Button bsSize="large" className="btn-info addable added"><Glyphicon glyph="plus" /></Button>;

    return (
      <div>
        <Button onClick={ this.openModal }>{this.props.folder} <Glyphicon glyph="folder-open" /></Button>
        <Modal
          show={ this.state.showModal }
          onHide={ close }
          container={ this }
          aria-labelledby="modal-medias"
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-medias">Médias de {this.props.folder}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row><Col sm={6}>Cover 1</Col><Col sm={6}>Cover 2</Col></Row>
            <Row>
              <Col sm={6}>
                <Col sm={6}>
                  <Dropzone id="dropzone-cover1" className="dropzone dropzone-cover text-center" onDrop={ this.handleDrop }>
                    { this.state.cover1 ?
                      <div>{ plusCoverAdded }
                        <div>{ this.state.cover1.map((file) => <img src={file.preview} key={file.preview} height="196" />) }</div>
                        { this.state.cover1Progress ? <div className="progress-bar-out"><div className="progress-bar-in" id="barCover1"></div></div> : null }
                      </div>
                    : plusCover }
                    { this.state.cover1OnServer ?
                        <div><img src={this.state.cover1OnServer} height="196" /></div>
                    : null }
                  </Dropzone>
                </Col>
                <Col sm={6}>
                  { this.state.cover1UploadIssue ?
                    <div className="alert alert-danger" role="alert">
                      <button type="button" onClick={ () => this.setState({cover1UploadIssue:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>Problème de chargement du média</strong>
                        <br />L'image de cover 1 n'a pas pu être chargée sur le serveur
                    </div> : null }
                  { this.state.cover1UploadSuccess ?
                    <div className="alert alert-success" role="alert">
                      <button type="button" onClick={ () => this.setState({cover1UploadSuccess:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>Média chargé</strong>
                        <br />L'image de cover 1 a été chargée correctement sur le serveur
                    </div> : null }
                </Col>
              </Col>
              <Col sm={6}>
                <Col sm={6}>
                  <Dropzone id="dropzone-cover2" className="dropzone dropzone-cover text-center" onDrop={ this.handleDrop }>
                    { this.state.cover2 ?
                      <div>{ plusCoverAdded }
                        <div>{ this.state.cover2.map((file) => <img src={file.preview} key={file.preview} height="196" />) }</div>
                        { this.state.cover2Progress ? <div className="progress-bar-out"><div className="progress-bar-in" id="barCover2"></div></div> : null }
                      </div> : plusCover }
                      { this.state.cover2OnServer ?
                        <div><img src={this.state.cover2OnServer} height="196" /></div>
                      : null }
                  </Dropzone>
                </Col>
                <Col sm={6}>
                  { this.state.cover2UploadIssue ?
                    <div className="alert alert-danger" role="alert">
                      <button type="button" onClick={ () => this.setState({cover2UploadIssue:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>Problème de chargement du média</strong>
                        <br />L'image de cover 2 n'a pas pu être chargée sur le serveur
                    </div> : null }
                  { this.state.cover2UploadSuccess ?
                    <div className="alert alert-success" role="alert">
                      <button type="button" onClick={ () => this.setState({cover2UploadSuccess:false})} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>Média chargé</strong>
                        <br />L'image de cover 2 a été chargée correctement sur le serveur
                    </div> : null }
                </Col>
              </Col>
            </Row>
            <Row>
              <Row><Col sm={12}>Médias</Col></Row>
              <Col sm={12}>
                <Dropzone id="dropzone-medias" className="dropzone" onDrop={ this.handleDrop } disableClick={ true }>
                  { this.state.medias ?
                  <div>{ plusAdded }
                    <div className="inlineBlock">
                      { this.state.medias.map((file) => {
                        const uniqueId = "remove"+file.name;
                        const path = 'projects/' + this.props.page + '/' + this.props.folder + '/medias/' + file.name;
                        return (<div className="inlineBlock" key={ file.name }>
                          <img src={file.preview} key={file.preview} height="98" style={{marginRight: "10px"}} />
                          <span className="remove-media" onClick={ this.handleMediaRemove } id={ uniqueId } data-path={ path }>X</span>
                        </div>);
                      }) }
                    </div>
                    { this.state.mediasProgress ? <div className="progress-bar-out"><div className="progress-bar-in" id="barMedias"></div></div> : null }
                  </div> : plus }
                  { this.state.mediasOnServer ?
                    <div className="inlineBlock">
                      { this.state.mediasOnServer.map((file) => {
                        const uniqueId = "remove"+file.split('/').pop();
                        return (<div className="inlineBlock" key={ file }>
                          <img src={file} height="98" style={{marginRight: "10px"}} />
                          <span className="remove-media" onClick={ this.handleMediaRemove } id={ uniqueId } data-path={ file }>X</span>
                        </div>);
                      }) }
                    </div>
                  : null }
                </Dropzone>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ close }>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default ProjectFolder;
