import React from 'react';
import EditableContent from './EditableContent';

const WhosWho = React.createClass({
    render: function() {
        let initialContent = "<p>Il était une fois en 2015, une envie naquit au coin de la rue. L’idée un peu surréaliste de créer une jungle vestimentaire, en grattant les strates de nos restes populaires.</p>";
        initialContent += "<p>CADAVRESKY c’est le pied de nez au bras tendu des tendances actuelles. Sans concession, ni contre-façon.</p>";
        initialContent += "<p>CADAVRESKY propose à ton plumage un voyage au pays de la préhistoire contemporaine. A consommer sans modération en un cocktail bien frappé des cultures urbaines, street art et pop.</p>";
        initialContent += "<p>CADAVRESKY fait un tout avec rien et surtout, plus que tout, recherche, retrouve, décompose, recompose, un savoir-faire artisanal par le travail de la pièce unique pour des êtres uniques.</p>";
        initialContent += "<p>CADAVRESKY décale les codes, pour jouer de styles, en proposant une vision alternative de se penser avec classe et t’invite à trouver l’écho qui te correspond à travers chaque projet</p>";

        return (
          <div>
            <EditableContent initialContent={ initialContent } />
          </div>
        );
    }
});

export default WhosWho;
