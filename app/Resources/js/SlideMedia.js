import React from 'react';
import ImageGallery from 'react-image-gallery';

const SlideMedia = React.createClass({
  getInitialState: function() {
    return {
      content: null,
    };
  },
  handleImageLoad: function(event) {
    console.log('Image loaded ', event.target)
  },
  handlePlay: function() {
    this._imageGallery.play()
  },
  handlePause: function() {
    this._imageGallery.pause()
  },
  render: function() {
      if(this.props.media === 'projet1') {
        const images = [
          {
            original: 'http://lorempixel.com/1000/600/nature/1/',
            thumbnail: 'http://lorempixel.com/1000/600/nature/1/',
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/2/',
            thumbnail: 'http://lorempixel.com/250/150/nature/2/'
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/3/',
            thumbnail: 'http://lorempixel.com/250/150/nature/3/'
          }
        ]
      }
      return (
        <div>
          <button onClick={ this.handlePlay }>Play</button>
          <button onClick={ this.handlePause }>Pause</button>
          <ImageGallery
            ref={i => this._imageGallery = i}
            items={images}
            slideInterval={2000}
            onImageLoad={this.handleImageLoad}
          />
        </div>
      );
  }
});

export default SlideMedia;
