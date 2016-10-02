import React from 'react';
import Link from './Link';
import { getMedias } from './helpers/ajax';

const ProjectPreview = React.createClass({
  getInitialState: function() {
    return {
      hover: false,
      cover1OnServer: null,
      cover2OnServer: null,
    };
  },
  componentDidMount: function() {
    getMedias(this, this.props.page, this.props.project);
  },
  render: function() {
    return (
      <span style={{width: "98px"}}>
        { this.state.hover ?
          <Link to={ location.pathname+this.props.project } onMouseLeave={ () => this.setState({hover: false}) }><img src={this.state.cover2OnServer} key={this.state.cover2OnServer} height="98" style={{marginRight: "5px", marginTop: "5px"}} onMouseLeave={ () => this.setState({hover: false}) } /></Link>
           :
          <img src={this.state.cover1OnServer} key={this.state.cover1OnServer} height="98" style={{marginRight: "5px", marginTop: "5px"}} onMouseEnter={ () => this.setState({hover: true}) } />
        }
      </span>
    );
  }
});

export default ProjectPreview;
// code pour localhost
//<Link to={ location.pathname.split('/').pop()+'/'+this.props.project } onMouseLeave={ () => this.setState({hover: false}) }><img src={this.state.cover2OnServer} key={this.state.cover2OnServer} height="98" style={{marginRight: "5px", marginTop: "5px"}} onMouseLeave={ () => this.setState({hover: false}) } /></Link>
