import React from 'react';

const ProjectPreview = React.createClass({
  getInitialState: function() {
    return {
      content: null,
    };
  },
  render: function() {
      const ImgCover1 = require("../images/" + this.props.project + "/cover1.png");
      return (
        <div onMouseEnter={ () => console.log('my man') } >
          <img src={ ImgCover1 } />
        </div>
      );
  }
});

export default ProjectPreview;
