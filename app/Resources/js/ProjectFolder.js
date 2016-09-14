import React from 'react';
import Dropzone from 'react-dropzone';
import { Row, Col, Button, Glyphicon, Modal } from 'react-bootstrap';

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
  },
  handleDropCover1: function (file) {
    this.setState({
      cover1: file
    });
  },
  handleDropCover2: function (file) {
    this.setState({
      cover2: file
    });
  },
  handleDropMedias: function (files) {
    console.log(files);
    this.setState({
      medias: files
    });
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
                  <Dropzone id="dropzone-cover1" className="dropzone dropzone-cover text-center" onDrop={ this.handleDropCover1 }>
                    { this.state.cover1 ?
                      <div>{ plusCoverAdded }
                        <div>{ this.state.cover1.map((file) => <img src={file.preview} key={file.preview} height="196" />) }</div>
                      </div> : plusCover }
                  </Dropzone>
                </Col>
                <Col sm={6}>
                </Col>
              </Col>
              <Col sm={6}>
                <Col sm={6}>
                  <Dropzone id="dropzone-cover2" className="dropzone dropzone-cover text-center" onDrop={ this.handleDropCover2 }>
                    { this.state.cover2 ?
                      <div>{ plusCoverAdded }
                        <div>{ this.state.cover2.map((file) => <img src={file.preview} key={file.preview} height="196" />) }</div>
                      </div> : plusCover }
                  </Dropzone>
                </Col>
                <Col sm={6}>
                </Col>
              </Col>
            </Row>
            <Row>
              <Row><Col sm={12}>Médias</Col></Row>
              <Col sm={12}>
                <Dropzone id="dropzone-medias" className="dropzone text-center" onDrop={ this.handleDropMedias }>
                  { plus }
                </Dropzone>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                { this.state.medias ?
                  <div>
                    <h2>Uploading { this.state.medias.length } files...</h2>
                    <div>{ this.state.medias.map((file) => <img src={file.preview} key={file.preview} width="100" style={{marginRight: "10px"}} />) }</div>
                  </div> : null }
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
