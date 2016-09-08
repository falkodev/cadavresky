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

import ImgMenuGreenYellow       from '../images/menu_categories/B1_unselected.png';
import ImgMenuRedOrange         from '../images/menu_categories/B2_unselected.png';
import ImgMenuLightGreenPurple  from '../images/menu_categories/B3_unselected.png';
import ImgMenuLightPinkOrange   from '../images/menu_categories/B4_unselected.png';
import ImgMenuGreenLightBlue    from '../images/menu_categories/B5_unselected.png';
import ImgMenuRedYellow         from '../images/menu_categories/B6_unselected.png';

import ImgMenuB1Selected from '../images/menu_categories/B1_selected.png';
import ImgMenuB2Selected from '../images/menu_categories/B2_selected.png';
import ImgMenuB3Selected from '../images/menu_categories/B3_selected.png';
import ImgMenuB4Selected from '../images/menu_categories/B4_selected.png';
import ImgMenuB5Selected from '../images/menu_categories/B5_selected.png';
import ImgMenuB6Selected from '../images/menu_categories/B6_selected.png';

Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

const menus = [ImgMenuGreenYellow, ImgMenuRedOrange, ImgMenuLightGreenPurple, ImgMenuLightPinkOrange, ImgMenuGreenLightBlue, ImgMenuRedYellow];
menus.shuffle();

const Layout = React.createClass({
    getInitialState: function() {
        return {
            open: false,
            transparentContent: false,
            movedLp: false,
            onLoad: true,
            menu1: menus[0],
            menu2: menus[1],
            menu3: menus[2],
            menu4: menus[3],
            menu5: menus[4],
            menu6: menus[5],
            hover: false
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
    toggleSubMenu: function(parent) {
        Array.from(document.querySelectorAll(".sub-menu.menu-" + parent)).forEach(function(key, value) {
            key.classList.toggle("clicked");
        });
    },
    changeColor: function() {
        menus.shuffle();
        this.setState({
            menu1: menus[0],
            menu2: menus[1],
            menu3: menus[2],
            menu4: menus[3],
            menu5: menus[4],
            menu6: menus[5],
        });
    },
    onEnterHover: function(menu, state) {
        const selected = state.split('images/')[1].split('_')[0];
        let menuHover;

        switch (selected) {
            case 'B1':
                menuHover = ImgMenuB1Selected;
                break;
            case 'B2':
                menuHover = ImgMenuB2Selected;
                break;
            case 'B3':
                menuHover = ImgMenuB3Selected;
                break;
            case 'B4':
                menuHover = ImgMenuB4Selected;
                break;
            case 'B5':
                menuHover = ImgMenuB5Selected;
                break;
            case 'B6':
                menuHover = ImgMenuB6Selected;
                break;
            default:
                menuHover = menu;
        }

        this.setState({
            hover: true,
            [menu]: menuHover,
        });
    },
    onLeaveHover: function() {
        this.setState({
            hover: false,
            menu1: menus[0],
            menu2: menus[1],
            menu3: menus[2],
            menu4: menus[3],
            menu5: menus[4],
            menu6: menus[5],
        });
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
                                        <Link to="whoswho" className="menu menu-whoswho active" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu1 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu1', this.state.menu1)} onMouseLeave={this.onLeaveHover}>Whos who</Link>

                                        <li role="presentation" className="menu menu-projectology" style={{ backgroundImage : 'url(' + this.state.menu2 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu2', this.state.menu2)} onMouseLeave={this.onLeaveHover}>
                                            <span onClick={ this.toggleSubMenu.bind(null, "projectology") }>Projectology</span>
                                        </li>
                                        <Link to="wear" className="menu sub-menu menu-projectology" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu2 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu2', this.state.menu2)} onMouseLeave={this.onLeaveHover}>To wear</Link>
                                        <Link to="adorn" className="menu sub-menu menu-projectology" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu2 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu2', this.state.menu2)} onMouseLeave={this.onLeaveHover}>To adorn</Link>

                                        <li role="presentation" className="menu menu-zoo" style={{ backgroundImage : 'url(' + this.state.menu3 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu3', this.state.menu3)} onMouseLeave={this.onLeaveHover}>
                                            <span onClick={ this.toggleSubMenu.bind(null, "zoo") }>The zoo</span>
                                        </li>
                                        <Link to="collaboratory" className="menu sub-menu menu-zoo" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu3 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu3', this.state.menu3)} onMouseLeave={this.onLeaveHover}>Collaboratory</Link>
                                        <Link to="buddies" className="menu sub-menu menu-zoo" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu3 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu3', this.state.menu3)} onMouseLeave={this.onLeaveHover}>Buddies</Link>

                                        <Link to="shop" className="menu menu-shop" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu4 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu4', this.state.menu4)} onMouseLeave={this.onLeaveHover}>Shop</Link>

                                        <Link to="goodies" className="menu menu-goodies" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu5 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu5', this.state.menu5)} onMouseLeave={this.onLeaveHover}>Goodies</Link>

                                        <Link to="#" className="menu menu-contact" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu6 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu6', this.state.menu6)} onMouseLeave={this.onLeaveHover}>Contact</Link>

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
