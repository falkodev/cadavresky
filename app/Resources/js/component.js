import React from 'react';
import { Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Fade, Collapse, Panel } from 'react-bootstrap';
import ImgPalm from '../images/player/palm2.png';

const Component = React.createClass({
    getInitialState: function() {
        return {
            open: false,
            transparentContent: false
        };
    },
    toggleMenu: function() {
        this.setState({
            open: !this.state.open,
            transparentContent: !this.state.transparentContent,
        });
    },
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={2}>
                        <img className="logo" id="logo-default" src="../images/CADAVRESKY-logo-fullscreen.png"/>
                        <div className="sidebar-nav">
                            <Navbar>
                                <Navbar.Header>
                                    <div>
                                    <Collapse dimension="height" in={this.state.open}>
                                        <Navbar.Toggle id="toggle-text-mobile" children={
                                            <div id="div-text-mobile">
                                                <img id="text-mobile" src="../images/CADAVRESKY-logo-mobile-opened.png" width="120px"/> {/*<span id="close-menu-icon" className="pull-right"><img id="close-menu" src="../images/close-menu.png" width="10px"/></span>*/}
                                            </div> }
                                        onClick={ this.toggleMenu }/>
                                    </Collapse>
                                    <Fade timeout={1} in={!this.state.open}>
                                        <Navbar.Toggle id="toggle-logo-mobile" children={ <img className="logo" id="logo-mobile" src="../images/CADAVRESKY-logo-mobile-closed.png" width="45px"/> } onClick={ this.toggleMenu }/>
                                    </Fade>
                                    </div>
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <Nav className="menu navbar-fixed-top">
                                        <NavItem href="#" className="menu-whoswho active">Who's who</NavItem>
                                        <NavItem href="#" className="menu-projectology">Projectology</NavItem>
                                        <NavItem href="#" className="menu-zoo">The zoo</NavItem>
                                        <NavItem href="#" className="menu-shop">Shop</NavItem>
                                        <NavItem href="#" className="menu-goodies">Goodies</NavItem>
                                        <NavItem href="#" className="menu-contact">Contact</NavItem>
                                        <NavItem href="#" className="menu-facebook menu-desktop">Facebook</NavItem>
                                        <NavItem href="#" className="menu-instagram menu-desktop">Instagram</NavItem>
                                        <li id="nav-logos">
                                            <a href="http://www.instagram.com"><img id="logo-instagram" src="../images/instagram-logo.png"/></a>&nbsp;
                                            <a href="http://www.facebook.com"><img id="logo-facebook" src="../images/facebook-logo.png"/></a>
                                        </li>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </Col>
                    <Col sm={10}>
                        <div className={ this.state.transparentContent ?  "content transparent" : "content" }>
                            <p>Il était une fois en 2015, une envie naquit au coin de la rue. L’idée un peu surréaliste de créer une jungle vestimentaire, en grattant les strates de nos restes populaires.</p>

                            <p>CADAVRESKY c’est le pied de nez au bras tendu des tendances actuelles. Sans concession, ni contre-façon.</p>

                            <p>CADAVRESKY propose à ton plumage un voyage au pays de la préhistoire contemporaine. A consommer sans modération en un cocktail bien frappé des cultures urbaines, street art et pop.</p>

                            <p>CADAVRESKY fait un tout avec rien et surtout, plus que tout, recherche, retrouve, décompose, recompose, un savoir-faire artisanal par le travail de la pièce unique pour des êtres uniques.</p>

                            <p>CADAVRESKY décale les codes, pour jouer de styles, en proposant une vision alternative de se penser avec classe et t’invite à trouver l’écho qui te correspond à travers chaque projet.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="footer">
                        <img id="palm" src={ImgPalm} />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Component;

//<Row>
//    <Col sm={12}>
//        <img id="palm" src={ImgPalm} />
//    </Col>
//</Row>

//<div className="container">
//                  <div className="row flex-row">
//                    <div className="col-md-12">
//                      <div className="panel panel-default flex-col">
//                       <div className="panel-heading">Title flex-col</div>
//                       <div className="panel-body flex-grow">Content here -- div with .flex-grow<br/>Yo<br/>Yeah</div>
//                       <div className="panel-footer">Footer</div>
//                       </div>
//                    </div>	
//                  </div>
//                </div>