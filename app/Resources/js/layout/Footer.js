import React from 'react';

//images
import ImgPalm             from '../../images/player/palm.png';
import ImgCoverEthical     from '../../images/player/lp-cover-ethical.png';
import ImgLpEthical        from '../../images/player/lp-ethical.png';
import ImgScrollingLine    from '../../images/player/scrolling-line.png';

const Footer = React.createClass({
    getInitialState: function() {
        return {
            movedLp: false,
            onLoad: true,
        };
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
        <div>
            <img id="palm" src={ ImgPalm } onClick={ this.toggleMovingLp }/>
            <img id="cover" src={ ImgCoverEthical } onClick={ this.toggleMovingLp }/>
            <img id="lp" src={ ImgLpEthical } className={ this.state.onLoad ? "lp" : this.state.movedLp ? "lp lp-moved lp-moving" : "lp lp-moving" }/>
            <img id="scrolling-line" src={ ImgScrollingLine } className={ this.state.movedLp ? "line line-moving" : "line" }/>
            <div className={ this.state.movedLp ? "text text-moving" : "text" }><marquee><span>Texte défilant en caractères fins pour l'instant</span></marquee></div>
        </div>
        );
    }
});

export default Footer;
