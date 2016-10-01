import React from 'react';
//import ImageGallery from 'react-image-gallery';
//import Gallery from 'react-photo-gallery';
import Gallery from './gallery/Gallery';

const SlideMedia = React.createClass({
  getInitialState: function() {
    return {
      content: null,
    };
  },
  handleImageLoad: function(event) {
    console.log('Image loaded ', event.target)
  },
//  handlePlay: function() {
//    this._imageGallery.play()
//  },
//  handlePause: function() {
//    this._imageGallery.pause()
//  },
//  handleFullscreen: function() {
//    this._imageGallery.fullScreen()
//  },
  render: function() {
//        const images = [
//          {
//            original: 'http://lorempixel.com/1000/600/nature/1/',
//            thumbnail: 'http://lorempixel.com/1000/600/nature/1/',
//          },
//          {
//            original: 'http://lorempixel.com/1000/600/nature/2/',
//            thumbnail: 'http://lorempixel.com/250/150/nature/2/'
//          },
//          {
//            original: 'http://lorempixel.com/1000/600/nature/3/',
//            thumbnail: 'http://lorempixel.com/250/150/nature/3/'
//          }
//        ];
//const PHOTO_SET = [
//  {
//    src: 'http://lorempixel.com/1000/600/nature/1/',
//    width: 681,
//    height: 1024,
//    aspectRatio: 1.5,
//    lightboxImage:{
//    src: 'http://lorempixel.com/1000/600/nature/1/',
//    srcset: [
//      'http://lorempixel.com/1000/600/nature/1/ 1024w',
//      'http://lorempixel.com/1000/600/nature/1/ 800w',
//      'http://lorempixel.com/1000/600/nature/1/ 500w',
//      'http://lorempixel.com/1000/600/nature/1/ 320w',
//    ]
//    }
//  },
//  {
//    src: 'https://www.youtube.com/watch?v=vShK2gkpiZ4',
//    width: 600,
//    height: 600,
//    aspectRatio: 1,
//    lightboxImage:{
//    src: 'https://www.youtube.com/watch?v=vShK2gkpiZ4',
//    srcset: [
//      'https://www.youtube.com/watch?v=vShK2gkpiZ4 1024w',
//      'https://www.youtube.com/watch?v=vShK2gkpiZ4 800w',
//      'https://www.youtube.com/watch?v=vShK2gkpiZ4 500w',
//      'https://www.youtube.com/watch?v=vShK2gkpiZ4 320w',
//    ]
//    }
//  }
//];
    const images = [
    { title: 'Image-1', width: '800', height: '650' },
    { title: 'Image-2', width: '1000', height: '1000'},
    { title: 'Image-3', width: '400', height: '650' }
]

 const items = images.map(( item, i ) => {
    var src = "https://unsplash.it/" + item.width + "/" + item.height + "/?random";
    return (
        <div key={'image-'+i}>
            <h3 className="image-title">{item.title}</h3>
            <img className="centered" src={src} />
        </div>
    )
})

// add content to items
items.push(
    <div key={'content'}>
        <div className="centered">
            <h1>Some Random Text</h1>
            <p>Sociis risus nisi ridiculus urn?</p>
        </div>
    </div>
)

// add embeded video
items.push(
    <div key={'video'} className={'video-embed'}>
        <div className="centered">
            <iframe src="//player.vimeo.com/video/148626927" width="640px" height="420px" frameBorder="0"
              webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
        </div>
    </div>
)
      return (
        <div>
          <Gallery renderNav={true} loop={true} animate='slideLR'>
             {items}
          </Gallery>
        </div>
      );
  }
});

export default SlideMedia;
//          <button onClick={ this.handlePlay }>Play</button>
//          <button onClick={ this.handlePause }>Pause</button>
//          <ImageGallery
//            ref={i => this._imageGallery = i}
//            items={images}
//            slideInterval={2000}
//            onImageLoad={this.handleImageLoad}
//            onPlay={ this.handleFullscreen }
//          />

//<Gallery photos={PHOTO_SET} />
