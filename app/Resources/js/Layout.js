import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { dispatch } from './helpers/pubsub';

import ImgFlagFr from '../images/flag_fr.png';
import ImgFlagEn from '../images/flag_en.png';
import ImgFanion from '../images/fanion_fix.png';

const Layout = React.createClass({
    getInitialState: function() {
        return {
          transparentContent: false,
          language: (window.navigator.userLanguage||window.navigator.language).substr(0,2),
        };
    },
    handleToggleMenu: function(transparentContent) {
        this.setState({ transparentContent: transparentContent });
    },
    handleLanguage: function(language) {
      dispatch("languageChanged", language);
    },
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={2}>
                        <Header transparentContent={ this.state.transparentContent } onToggle={this.handleToggleMenu} />
                    </Col>
                    <Col sm={10}>
                        <img id="fanion" src={ImgFanion} style={{ position: "fixed", width: "35%", top: "0px", right: "0px" }} />
                        <div style={{ position: "fixed", top:"40px", right: "10px" }}>
                          <span onClick={ this.handleLanguage.bind(null, 'fr') } style={{ cursor: "pointer" }}><img src={ImgFlagFr} width="30" /></span>&nbsp;&nbsp;
                          <span onClick={ this.handleLanguage.bind(null, 'en') } style={{ cursor: "pointer" }}><img src={ImgFlagEn} width="30" /></span>
                        </div>
                        <div id="main" className={ this.state.transparentContent ?  "content transparent" : "content" }>
                          { this.props.children }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className={ this.state.transparentContent ?  "footer transparent" : "footer" }>
                        <Footer />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Layout;
