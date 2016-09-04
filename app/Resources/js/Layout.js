import React from 'react';
import { Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Fade, Collapse, Panel } from 'react-bootstrap';
import Link from './Link';

//images
import ImgLogo             from '../images/CADAVRESKY-logo-fullscreen.png';
import ImgLogoMobileOpened from '../images/CADAVRESKY-logo-mobile-opened.png';
import ImgLogoMobileClosed from '../images/CADAVRESKY-logo-mobile-closed.png';
import ImgLogoInsta        from '../images/instagram-logo.png';
import ImgLogoFb           from '../images/facebook-logo.png';
import ImgPalm             from '../images/player/palm.png';
import ImgCoverEthical     from '../images/player/lp-cover-ethical.png';
import ImgLpEthical        from '../images/player/lp-ethical.png';
import ImgScrollingLine    from '../images/player/scrolling-line.png';

const Layout = React.createClass({
    getInitialState: function() {
        return {
            open: false,
            transparentContent: false,
            movedLp: false,
            onLoad: true,
        };
    },
    toggleMenu: function() {
        this.setState({
            open: !this.state.open,
            transparentContent: !this.state.transparentContent,
        });
    },
    toggleMovingLp: function() {
        const elem = document.getElementById("lp");
        const stateMovedLp = this.state.movedLp;

        this.setState({
            movedLp: !this.state.movedLp,
            onLoad: false,
        });

        setTimeout(function(){
            if(!stateMovedLp) { elem.className = "lp lp-moved lp-moving"; }
            else { elem.className = "lp"; }
        },4000);
    },
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={2}>
                        <img className="logo" id="logo-default" src={ImgLogo}/>
                        <div className="sidebar-nav">
                            <Navbar>
                                <Navbar.Header>
                                    <div>
                                    <Collapse dimension="height" in={this.state.open}>
                                        <Navbar.Toggle id="toggle-text-mobile" children={
                                            <div id="div-text-mobile">
                                                <img id="text-mobile" src={ImgLogoMobileOpened} width="120px"/> {/*<span id="close-menu-icon" className="pull-right"><img id="close-menu" src="../images/close-menu.png" width="10px"/></span>*/}
                                            </div> }
                                        onClick={ this.toggleMenu }/>
                                    </Collapse>
                                    <div timeout={1} in={!this.state.open}>
                                        <Navbar.Toggle id="toggle-logo-mobile" children={ <img className="logo" id="logo-mobile" src={ImgLogoMobileClosed} width="45px"/> } onClick={ this.toggleMenu }/>
                                    </div>
                                    </div>
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <Nav className="menu navbar-fixed-top">
                                        <Link to="whoswho" className="menu menu-whoswho active">Whos who</Link>
                                        <Link to="projectology" className="menu menu-projectology">Projectology</Link>
                                        <Link to="zoo" className="menu menu-zoo">The zoo</Link>
                                        <Link to="shop" className="menu menu-shop">Shop</Link>
                                        <Link to="goodies" className="menu menu-goodies">Goodies</Link>
                                        <Link to="#" className="menu menu-contact">Contact</Link>
                                        <Link to="http://www.facebook.com" className="menu-facebook menu-desktop">Facebook</Link>
                                        <Link to="http://www.instagram.com" className="menu-instagram menu-desktop">Instagram</Link>
                                        <li id="nav-logos">
                                            <a href="http://www.instagram.com"><img id="logo-instagram" src={ImgLogoInsta}/></a>&nbsp;
                                            <a href="http://www.facebook.com"><img id="logo-facebook" src={ImgLogoFb}/></a>
                                        </li>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </Col>
                    <Col sm={10}>
                        <div className={ this.state.transparentContent ?  "content transparent" : "content" }>
                          {this.props.children}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className={ this.state.transparentContent ?  "footer transparent" : "footer" }>
                        <img id="palm" src={ ImgPalm } onClick={ this.toggleMovingLp }/>
                        <img id="cover" src={ ImgCoverEthical } onClick={ this.toggleMovingLp }/>
                        <img id="lp" src={ ImgLpEthical } className={ this.state.onLoad ? "lp" : this.state.movedLp ? "lp lp-moved lp-moving" : "lp lp-moving" }/>
                        <img id="scrolling-line" src={ ImgScrollingLine } className={ this.state.movedLp ? "line line-moving" : "line" }/>
                        <div className={ this.state.movedLp ? "text text-moving" : "text" }><marquee><span>Texte défilant en caractères fins pour l'instant</span></marquee></div>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Layout;
