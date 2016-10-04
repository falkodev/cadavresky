import React from 'react';
import ReactDom from 'react-dom';
import EditableContent from './EditableContent';
import Spinner from './Layout/Spinner';
import { Glyphicon } from 'react-bootstrap';
import { loadData, getMedias } from './helpers/ajax';
import { subscribe } from './helpers/pubsub';

import ImgArrowLeft from '../images/arrow-left.png';
import ImgArrowRight from '../images/arrow-right.png';
import ImgClose from '../images/close-menu.png';

let index = 0;

const DisplayProject = React.createClass({
  getInitialState: function() {
    subscribe("languageChanged", (language) => {
      this.setState({
        mediasOnServer: null,
        language: language,
      });
      loadData(this, this.props.page, language);
    });
    return {
      currentMedia: null,
      previousMedia: null,
      nextMedia: null,
      language: (window.navigator.userLanguage||window.navigator.language).substr(0,2),
    };
  },
  componentDidMount: function() {
    getMedias(this, this.props.page, location.pathname.split('/').pop());
    loadData(this, this.props.page, this.state.language);
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
        <div>
          <div style={{ height: "35vh", overflowY: "auto" }}>
            <EditableContent initialContent={ this.state.content } page={ this.props.page } editable={ false } language={ this.state.language } />
          </div>
          <div className="inlineBlock" ref="container">
            <img id="close" src={ImgClose} style={{ display:"none", width: "30px", position: "fixed", top: "40px", right: "85px" }} onClick={ this.goNormalScreen } />
            <img id="left" src={ImgArrowLeft} style={{display:"none", width: "30px"}} onClick={ this.displayPreviousFullScreen } />
            { this.state.mediasOnServer.map((file) => {
              const name = 'media_'+index;
              const src = '/'+file;
              index++;
              return (
                file.split(".").pop() === 'avi' || file.split(".").pop() === 'mp4' ?
                <video src={src} key={file} className="media video" onClick={ this.goFullScreen.bind(this, name) } ref={name} controls />:
                <img src={src} key={file} className="media" onClick={ this.goFullScreen.bind(this, name) } ref={name} />
              );
            }) }
            <img id="right" src={ImgArrowRight} style={{display:"none", width: "30px"}} onClick={ this.displayNextFullScreen } />
          </div>
        </div>
      : <Spinner />
    );
  }
});

export default DisplayProject;
