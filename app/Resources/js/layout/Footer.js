import React from 'react';
import Marquee from 'react-marquee';

//images
import ImgPalm             from '../../images/player/palm.png';
import ImgScrollingLine    from '../../images/player/scrolling-line.png';

import ImgCoverAesthetic   from '../../images/player/lp-cover-aesthetic.png';
import ImgLpAesthetic      from '../../images/player/lp-aesthetic.png';

import ImgCoverEcologic    from '../../images/player/lp-cover-ecologic.png';
import ImgLpEcologic       from '../../images/player/lp-ecologic.png';

import ImgCoverEconomic    from '../../images/player/lp-cover-economic.png';
import ImgLpEconomic       from '../../images/player/lp-economic.png';

import ImgCoverEthical     from '../../images/player/lp-cover-ethical.png';
import ImgLpEthical        from '../../images/player/lp-ethical.png';

let ImgCover;
let ImgLp;
let TextCategory;

Array.prototype.randomize = function() {
    const input = this;
    const index = input[Math.floor(Math.random() * input.length)];

    switch (index) {
        case 'aesthetic':
            ImgCover = ImgCoverAesthetic;
            ImgLp    = ImgLpAesthetic;
            TextCategory = "CADAVRESKY s'éponge d'empreintes artistiques, car ces mouvements résonnent dans la grotte de nos cerveaux et ont enfanté des électrons libres survoltés. C'est une envie de mise a plat, et au plis, de la chaîne chaotiquement logique entre idée et objet. CADAVRESKY veut shooter les sens interdits, par les sens imposés d'un système de conscience globalisée. CADAVRESKY propose une expérimentation philosophique de nos états d'âme systémiques, en répondant par l'humour à ces hématomes.";
            break;
        case 'ecologic':
            ImgCover = ImgCoverEcologic;
            ImgLp    = ImgLpEcologic;
            TextCategory = "CADAVRESKY à la main verte, a les dents longues, et se nourrit de matières en fin de vie. C'est au coeur de ces dernières que demeure le concept d'Urban Dustbin, comme un champs des possibles à la digestion lente de nos déjections de matières. CADAVRESKY veut valoriser l'inévitable mort programmée, en recherchant un dialogue entre sens et sensitivité, en jouant d'un vécu passé pour inventé une histoire bien présente.";
            break;
        case 'economic':
            ImgCover = ImgCoverEconomic;
            ImgLp    = ImgLpEconomic;
            TextCategory = "CADAVRESKY c'est le tractopelle des tendances; un joyeux radeaux de la méduse version fashion, qui fragmente un système cyclique, par des projets sporadiques et aléatoires. CADAVRESKY développe un concept vestimentaire ainsi qu'une volonté farouche à ouvrir son coeur, son temps et sa création à tout collaborateur passionné, dont les valeurs sont partagées. CADAVRESKY explore l'entraide et le faire ensemble ; tâter la mamelle économique afin que jaillisse l'osmose permettant de coexister sur un marché actuel de vaches maigres.";
            break;
        case 'ethical':
            ImgCover = ImgCoverEthical;
            ImgLp    = ImgLpEthical;
            TextCategory = "CADAVRESKY croit en l'homme parce qu'il y a une femme derrière ça. C'est aussi deux mains, une tête, et l'envie de faire unique comme alternative à la production de masse. Un artisanat urbain gorgé de bitume, sans frontière, ni drapeau, ayant pour seul horizon les rencontres, le partage et un monde plus beau.";
            break;
        default:
            ImgCover = ImgCoverAesthetic;
            ImgLp    = ImgLpAesthetic;
    }

    return input;
}
const category = ['aesthetic', 'ecologic', 'economic', 'ethical'];

const Footer = React.createClass({
    getInitialState: function() {
        category.randomize();

        return {
            movedLp: false,
            onLoad: true,
        };
    },
    componentWillReceiveProps: function(nextProps) { //changement de page
        category.randomize();
    },
    toggleMovingLp: function() {
        const elem = document.getElementById("lp");
        const stateMovedLp = this.state.movedLp;

        this.setState({
            movedLp: !this.state.movedLp,
            onLoad: false,
        });

        if(!stateMovedLp) { elem.className = "lp lp-moved lp-moving"; }
        else { elem.className = "lp"; }
    },
    render: function() {
        return (
        <div>
            <img id="palm" src={ ImgPalm } onClick={ this.toggleMovingLp }/>
            <img id="cover" src={ ImgCover } onClick={ this.toggleMovingLp }/>
            <img id="lp" src={ ImgLp } className={ this.state.onLoad ? "lp" : this.state.movedLp ? "lp lp-moved lp-moving" : "lp lp-moving" }/>
            <img id="scrolling-line" src={ ImgScrollingLine } className={ this.state.movedLp ? "line line-moving" : "line" }/>
            <div className={ this.state.movedLp ? "text text-moving" : "text" }><Marquee text={ TextCategory } loop={true} hoverToStop={true} leading={4000} trailing={2000} /></div>
        </div>
        );
    }
});

export default Footer;
