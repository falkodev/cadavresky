import React from 'react';
import ReactDom from 'react-dom';
import { Glyphicon } from 'react-bootstrap';
import { getMedias } from './helpers/ajax';
import Spinner from './Layout/Spinner';

let index = 0;

const DisplayProject = React.createClass({
  getInitialState: function() {
    return {
      currentMedia: null,
      previousMedia: null,
      nextMedia: null,
    };
  },
  componentDidMount: function() {
    getMedias(this, this.props.page, location.pathname.split('/').pop());
  },
  changePositions: function(name) {
    const position = parseInt(name.split('media_').pop(), 10);
    let p = position - 1;
    let n = position + 1;

    if(p < 0) { p = index - 1; }
    if(n == index) { n = 0; }

    this.setState({
      currentMedia: name,
      previousMedia: 'media_'+p,
      nextMedia: 'media_'+n,
    });
  },
  formatMedia: function(name) {
    if(this.refs[name].naturalWidth < this.refs[name].naturalHeight) { // long picture
      this.refs[name].style.width = 'auto';
      if(window.innerWidth < 768) { this.refs[name].style.height = '65vh'; }
      else { this.refs[name].style.height = '80vh'; }
    } else { // large picture
      this.refs[name].style.height = 'auto';
      if(window.innerWidth < 768) { this.refs[name].style.width = '80vw'; }
      else { this.refs[name].style.width = '60vw'; }
    }
    this.refs[name].style.display = 'block';
  },
  goFullScreen: function(name) {
    // hide every media
    Object.keys(this.refs).map((ref) => {
      this.refs[ref].style.display = 'none';
    });

    this.formatMedia(name);

    // center parent block
    this.refs.container.style.display = 'flex';
    this.refs.container.classList.add('flex-center');

    // center content div on small screens also
    if(window.innerWidth < 768) { document.getElementById('main').style.width = '100%'; }

    // display arrows and cross
    document.getElementById('left').style.display = 'block';
    document.getElementById('right').style.display = 'block';
    document.getElementById('close').style.display = 'block';

    this.changePositions(name);
  },
  goNormalScreen: function() {
    // display every media again
    Object.keys(this.refs).map((ref) => {
      if(ref !== 'container') {
        this.refs[ref].style.display = 'inline-block';
        this.refs[ref].style.height = '98px';
        this.refs[ref].style.width = 'auto';
      }
    });
    this.refs.container.style.display = 'inline-block';

    // cancel center picture
    this.refs.container.classList.remove('flex-center');
    if(window.innerWidth < 768) { document.getElementById('main').style.width = 'auto'; }

    // hide arrows and cross
    document.getElementById('left').style.display = 'none';
    document.getElementById('right').style.display = 'none';
    document.getElementById('close').style.display = 'none';
  },
  displayPreviousFullScreen: function() {
    this.refs[this.state.currentMedia].style.display = 'none';
    this.formatMedia(this.state.previousMedia);
    this.changePositions(this.state.previousMedia);
  },
  displayNextFullScreen: function() {
    this.refs[this.state.currentMedia].style.display = 'none';
    this.formatMedia(this.state.nextMedia);
    this.changePositions(this.state.nextMedia);
  },
  render: function() {
    index = 0;
    return (
      this.state.mediasOnServer ?
        <div className="inlineBlock" ref="container">
          <Glyphicon id="close" glyph="remove" style={{ display:"none", fontSize: "30px", position: "fixed", top: "50px", right: "25px" }} onClick={ this.goNormalScreen } />
          <Glyphicon id="left" glyph="chevron-left" style={{display:"none", fontSize: "30px"}} onClick={ this.displayPreviousFullScreen } />
          { this.state.mediasOnServer.map((file) => {
            const name = 'media_'+index;
            index++;
            return (
              file.split(".").pop() === 'avi' || file.split(".").pop() === 'mp4' ?
              <video src={file} key={file} className="media video" onClick={ this.goFullScreen.bind(this, name) } ref={name} controls />:
              <img src={file} key={file} className="media" onClick={ this.goFullScreen.bind(this, name) } ref={name} />
            );
          }) }
          <Glyphicon id="right" glyph="chevron-right" style={{display:"none", fontSize: "30px"}} onClick={ this.displayNextFullScreen } />
        </div>
      : <Spinner />
    );
  }
});

export default DisplayProject;
