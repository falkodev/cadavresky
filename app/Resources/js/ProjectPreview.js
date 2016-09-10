import React from 'react';
import Dropzone from 'react-dropzone';
import { Button, Glyphicon } from 'react-bootstrap';

const ProjectPreview = React.createClass({
  getInitialState: function() {
    const editable = this.props.editable;
    return {
      editable: editable,
    };
  },
  onDrop: function (files) {
    console.log(files);
    this.setState({
      files: files
    });
  },
  render: function() {
      const ImgCover1 = require("../images/" + this.props.project + "/cover1.png");
      return (
        <div>
          <Button bsSize="large" className="btn-info addable">
            <Glyphicon glyph="plus" />
          </Button>
          <Dropzone onDrop={ this.onDrop }>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          {this.state.files ? <div>
            <h2>Uploading {this.state.files.length} files...</h2>
            <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
            </div> : null}
          <img src={ ImgCover1 } />
        </div>
      );
  }
});

export default ProjectPreview;
//{ this.state.editable ? <Button bsSize="large" className="btn-primary"><Glyphicon glyph="plus" /></Button> : null }