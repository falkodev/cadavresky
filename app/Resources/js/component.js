import React from 'react';
import { Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const logo = "../images/CADAVRESKY-logo-mobile.png";
const text = "../images/CADAVRESKY-text-mobile.png";
const Component = React.createClass({
    getInitialState: function() {
        return {
            imgSrc: logo,
            imgWidth: "45px"
        };
    },
    toggleLogoMobileSrc: function() {
        this.state.imgSrc == logo ? this.setState({
            imgSrc: text,
            imgWidth: "150px"
        }):
        this.setState({
            imgSrc: logo,
            imgWidth: "45px"
        })
        ;
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
                                    <Navbar.Toggle children={<img className="logo" id="logo-mobile" src={this.state.imgSrc} width={this.state.imgWidth}/>} onClick={ this.toggleLogoMobileSrc }/>
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <Nav className="menu navbar-fixed-top">
                                        <NavItem href="#" className="menu-whoswho active">Who's who</NavItem>
                                        <NavItem href="#" className="menu-projectology">Projectology</NavItem>
                                        <NavItem href="#" className="menu-zoo">The zoo</NavItem>
                                        <NavItem href="#" className="menu-shop">Shop</NavItem>
                                        <NavItem href="#" className="menu-goodies">Goodies</NavItem>
                                        <NavItem href="#" className="menu-contact">Contact</NavItem>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </Col>
                    <Col sm={10}>
                        <div className="content">
                        <p>Il était une fois en 2015, une envie naquit au coin de la rue. L’idée un peu surréaliste de créer une jungle vestimentaire, en grattant les strates de nos restes populaires.</p>

                        <p>CADAVRESKY c’est le pied de nez au bras tendu des tendances actuelles. Sans concession, ni contre-façon.</p>

                        <p>CADAVRESKY propose à ton plumage un voyage au pays de la préhistoire contemporaine. A consommer sans modération en un cocktail bien frappé des cultures urbaines, street art et pop.</p>

                        <p>CADAVRESKY fait un tout avec rien et surtout, plus que tout, recherche, retrouve, décompose, recompose, un savoir-faire artisanal par le travail de la pièce unique pour des êtres uniques.</p>

                        <p>CADAVRESKY décale les codes, pour jouer de styles, en proposant une vision alternative de se penser avec classe et t’invite à trouver l’écho qui te correspond à travers chaque projet.</p>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Component;


//<div>
//                <div>
//                    <div className="row">
//                      <div className="col-sm-2">
//                        <img className="logo" id="logo-default" src="../images/CADAVRESKY-logo-fullscreen.png"/>
//                        <div className="sidebar-nav">
//                          <div className="navbar navbar-default" role="navigation">
//                            <div className="navbar-header">*/}
//                              {/*<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
//                                <span className="sr-only"></span>
//                                <span className="icon-bar"></span>
//                                <span className="icon-bar"></span>
//                                <span className="icon-bar"></span>
//                              </button>*/}
//                              {/*<span className="visible-xs navbar-brand" data-toggle="collapse" data-target=".sidebar-navbar-collapse"><img className="logo" id="logo-mobile" src="../images/CADAVRESKY-logo-mobile.png"/></span>
//                            </div>
//                            <div className="navbar-collapse collapse sidebar-navbar-collapse">
//                              <ReactCSSTransitionGroup component="ul" className="nav navbar-nav menu navbar-fixed-top" transitionName = "example"
//                                transitionEnterTimeout={500} transitionLeaveTimeout={300}>*/}
//                              {/*<ul key="list" className="nav navbar-nav menu navbar-fixed-top">*/}
//                                {/*<li key="who"><a href="#" className="menu-whoswho active">Who's who</a></li>
//                                <li key="proj"><a href="#" className="menu-projectology">Projectology</a></li>
//                                <li key="zoo"><a href="#" className="menu-zoo">The zoo</a></li>
//                                <li key="shop"><a href="#" className="menu-shop">Shop</a></li>
//                                <li key="goo"><a href="#" className="menu-goodies">Goodies</a></li>
//                                <li key="cont"><a href="#" className="menu-contact">Contact</a></li>*/}
//                                {/*<li className="dropdown">
//                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown <b className="caret"></b></a>
//                                  <ul className="dropdown-menu">
//                                    <li><a href="#">Action</a></li>
//                                    <li><a href="#">Another action</a></li>
//                                    <li><a href="#">Something else here</a></li>
//                                    <li className="divider"></li>
//                                    <li className="dropdown-header">Nav header</li>
//                                    <li><a href="#">Separated link</a></li>
//                                    <li><a href="#">One more separated link</a></li>
//                                  </ul>
//                                </li>
//                                <li><a href="#">Reviews <span className="badge">1,118</span></a></li>*/}
//                              {/*</ul>*/}
//                             {/*</ReactCSSTransitionGroup>
//                            </div>
//                          </div>
//                        </div>
//                      </div>
//                    <div className="col-sm-10">
//                        <div className="content">
//                        <p>Il était une fois en 2015, une envie naquit au coin de la rue. L’idée un peu surréaliste de créer une jungle vestimentaire, en grattant les strates de nos restes populaires.</p>
//
//                        <p>CADAVRESKY c’est le pied de nez au bras tendu des tendances actuelles. Sans concession, ni contre-façon.</p>
//
//                        <p>CADAVRESKY propose à ton plumage un voyage au pays de la préhistoire contemporaine. A consommer sans modération en un cocktail bien frappé des cultures urbaines, street art et pop.</p>
//
//                        <p>CADAVRESKY fait un tout avec rien et surtout, plus que tout, recherche, retrouve, décompose, recompose, un savoir-faire artisanal par le travail de la pièce unique pour des êtres uniques.</p>
//
//                        <p>CADAVRESKY décale les codes, pour jouer de styles, en proposant une vision alternative de se penser avec classe et t’invite à trouver l’écho qui te correspond à travers chaque projet.</p>
//                        </div>
//                    </div>
//                  </div>
//                </div>
//            </div>
