import React from 'react';
import { Navbar, Collapse } from 'react-bootstrap';
import Menu from './Menu';

//images
import ImgLogo             from '../../images/CADAVRESKY-logo-fullscreen.png';
import ImgLogoMobileOpened from '../../images/CADAVRESKY-logo-fullscreen.png';
import ImgLogoMobileClosed from '../../images/CADAVRESKY-logo-mobile-closed.png';

const Header = React.createClass({
    getInitialState: function() {
        return {
            open: false,
            transparentContent: this.props.transparentContent,
        };
    },
    toggleMenu: function(e) {
        const currentStateContent = !this.state.transparentContent;
        this.setState({
            open: !this.state.open,
            transparentContent: currentStateContent,
        });
        this.props.onToggle(currentStateContent);
    },
    render: function() {
        return (
        <div>
            <img className="logo" id="logo-default" src={ImgLogo} />
            <div className="sidebar-nav">
                <Navbar>
                    <Navbar.Header>
                        <div>
                        <Collapse dimension="height" in={this.state.open}>
                            <Navbar.Toggle id="toggle-text-mobile" children={
                                <div id="div-text-mobile">
                                    <img id="text-mobile" src={ImgLogoMobileOpened} width="120px"/> {/*<span id="close-menu-icon" className="pull-right"><img id="close-menu" src="../images/close-menu.png" width="10px"/></span>*/}
                                </div> }
                            onClick={ this.toggleMenu } />
                        </Collapse>
                        <div timeout={1} in={!this.state.open}>
                            <Navbar.Toggle id="toggle-logo-mobile" children={ <img className="logo" id="logo-mobile" src={ImgLogoMobileClosed} width="45px"/> } onClick={ this.toggleMenu } />
                        </div>
                        </div>
                    </Navbar.Header>
                    <Menu />
                </Navbar>
            </div>
        </div>
        );
    }
});

export default Header;
