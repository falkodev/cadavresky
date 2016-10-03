import React from 'react';
import { Nav, Navbar, Collapse } from 'react-bootstrap';
import Link from '../Link';

import ImgLogoInsta        from '../../images/instagram-logo.png';
import ImgLogoFb           from '../../images/facebook-logo.png';

import ImgMenuGreenYellow       from '../../images/menu_categories/B1_unselected.png';
import ImgMenuRedOrange         from '../../images/menu_categories/B2_unselected.png';
import ImgMenuLightGreenPurple  from '../../images/menu_categories/B3_unselected.png';
import ImgMenuLightPinkOrange   from '../../images/menu_categories/B4_unselected.png';
import ImgMenuGreenLightBlue    from '../../images/menu_categories/B5_unselected.png';
import ImgMenuRedYellow         from '../../images/menu_categories/B6_unselected.png';

import ImgMenuB1Selected from '../../images/menu_categories/B1_selected.png';
import ImgMenuB2Selected from '../../images/menu_categories/B2_selected.png';
import ImgMenuB3Selected from '../../images/menu_categories/B3_selected.png';
import ImgMenuB4Selected from '../../images/menu_categories/B4_selected.png';
import ImgMenuB5Selected from '../../images/menu_categories/B5_selected.png';
import ImgMenuB6Selected from '../../images/menu_categories/B6_selected.png';

Array.prototype.shuffle = function() {
    const input = this;

    for (let i = input.length-1; i >=0; i--) {
        const randomIndex = Math.floor(Math.random()*(i+1));
        const itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }

    return input;
}

const menus = [ImgMenuGreenYellow, ImgMenuRedOrange, ImgMenuLightGreenPurple, ImgMenuLightPinkOrange, ImgMenuGreenLightBlue, ImgMenuRedYellow];
menus.shuffle();

const pathname = location.protocol + '//' + location.host + '/' + process.env.host;

const Menu = React.createClass({
    getInitialState: function() {
        return {
            menu1: menus[0],
            menu2: menus[1],
            menu3: menus[2],
            menu4: menus[3],
            menu5: menus[4],
            menu6: menus[5],
            hover: false,
        };
    },
    toggleSubMenu: function(parent) {
        //close other sub-menus
        Array.from(document.querySelectorAll(".sub-menu:not(.menu-" + parent + ")")).forEach(function(key, value) {
            key.classList.remove("clicked");
        });

        //toggle current submenu
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
        <Navbar.Collapse>
            <Nav className="menu navbar-fixed-top">
                <Link to={ pathname+"/whoswho" } className="menu menu-whoswho active" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu1 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu1', this.state.menu1)} onMouseLeave={this.onLeaveHover}>Who's who</Link>

                <li role="presentation" className="menu menu-projectology" style={{ backgroundImage : 'url(' + this.state.menu2 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu2', this.state.menu2)} onMouseLeave={this.onLeaveHover}>
                    <span onClick={ this.toggleSubMenu.bind(null, "projectology") }>Projectology</span>
                </li>
                <Link to={ pathname+"/wear" } className="menu sub-menu menu-projectology" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu2 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu2', this.state.menu2)} onMouseLeave={this.onLeaveHover}>&nbsp;&nbsp;&nbsp;&nbsp;To wear</Link>
                <Link to={ pathname+"/adorn" } className="menu sub-menu menu-projectology" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu2 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu2', this.state.menu2)} onMouseLeave={this.onLeaveHover}>&nbsp;&nbsp;&nbsp;&nbsp;To adorn</Link>

                <li role="presentation" className="menu menu-zoo" style={{ backgroundImage : 'url(' + this.state.menu3 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu3', this.state.menu3)} onMouseLeave={this.onLeaveHover}>
                    <span onClick={ this.toggleSubMenu.bind(null, "zoo") }>The zoo</span>
                </li>
                <Link to={ pathname+"/collaboratory" } className="menu sub-menu menu-zoo" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu3 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu3', this.state.menu3)} onMouseLeave={this.onLeaveHover}>&nbsp;&nbsp;&nbsp;&nbsp;Collaboratory</Link>
                <Link to={ pathname+"/buddies" } className="menu sub-menu menu-zoo" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu3 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu3', this.state.menu3)} onMouseLeave={this.onLeaveHover}>&nbsp;&nbsp;&nbsp;&nbsp;Buddies</Link>

                <Link to={ pathname+"/shop" } className="menu menu-shop" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu4 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu4', this.state.menu4)} onMouseLeave={this.onLeaveHover}>Shop</Link>

                <Link to={ pathname+"/goodies" } className="menu menu-goodies" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu5 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu5', this.state.menu5)} onMouseLeave={this.onLeaveHover}>Goodies</Link>

                <Link to={ pathname+"/contact" } className="menu menu-contact" onClick={ this.changeColor } style={{ backgroundImage : 'url(' + this.state.menu6 + ')' }} onMouseEnter={this.onEnterHover.bind(null, 'menu6', this.state.menu6)} onMouseLeave={this.onLeaveHover}>Contact</Link>

                <li role="presentation" className="menu-facebook menu-desktop text-center"><a href="http://www.facebook.com/cadavresky">Facebook</a></li>
                <li role="presentation" className="menu-instagram menu-desktop text-center"><a href="http://www.instagram.com/cadavresky">Instagram</a></li>
                <li id="nav-logos">
                    <a href="http://www.instagram.com/cadavresky"><img id="logo-instagram" src={ImgLogoInsta}/></a>&nbsp;
                    <a href="http://www.facebook.com/cadavresky"><img id="logo-facebook" src={ImgLogoFb}/></a>
                </li>
            </Nav>
        </Navbar.Collapse>
        );
    }
});

export default Menu;
