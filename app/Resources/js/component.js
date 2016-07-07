import React from 'react';

const Component = React.createClass({
    render: function () {
        return (
            <div>
                <div>  
                    <div className="row">
                      <div className="col-sm-2">
                        <img className="logo" id="logo-default" src="../images/CADAVRESKY-small-black-logo.png"/>
                        <div className="sidebar-nav">
                          <div className="navbar navbar-default" role="navigation">
                            <div className="navbar-header">
                              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-navbar-collapse">
                                <span className="sr-only"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                              </button>
                              <span className="visible-xs navbar-brand"><img className="logo" id="logo-mobile" src="../images/CADAVRESKY-small-black-logo.png"/></span>
                            </div>
                            <div className="navbar-collapse collapse sidebar-navbar-collapse">
                              <ul className="nav navbar-nav menu">
                                <li><a href="#" className="menu-whoswho active">Who's who</a></li>
                                <li><a href="#" className="menu-projectology">Projectology</a></li>
                                <li><a href="#" className="menu-zoo">The zoo</a></li>
                                <li><a href="#" className="menu-shop">Shop</a></li>
                                <li><a href="#" className="menu-goodies">Goodies</a></li>
                                <li><a href="#" className="menu-contact">Contact</a></li>
                                {/*<li className="dropdown">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Dropdown <b className="caret"></b></a>
                                  <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Nav header</li>
                                    <li><a href="#">Separated link</a></li>
                                    <li><a href="#">One more separated link</a></li>
                                  </ul>
                                </li>
                                <li><a href="#">Reviews <span className="badge">1,118</span></a></li>*/}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="col-sm-10">
                        <div className="content">
                        <p>Il était une fois en 2015, une envie naquit au coin de la rue. L’idée un peu surréaliste de créer une jungle vestimentaire, en grattant les strates de nos restes populaires.</p>

                        <p>CADAVRESKY c’est le pied de nez au bras tendu des tendances actuelles. Sans concession, ni contre-façon.</p>

                        <p>CADAVRESKY propose à ton plumage un voyage au pays de la préhistoire contemporaine. A consommer sans modération en un cocktail bien frappé des cultures urbaines, street art et pop.</p>

                        <p>CADAVRESKY fait un tout avec rien et surtout, plus que tout, recherche, retrouve, décompose, recompose, un savoir-faire artisanal par le travail de la pièce unique pour des êtres uniques.</p>

                        <p>CADAVRESKY décale les codes, pour jouer de styles, en proposant une vision alternative de se penser avec classe et t’invite à trouver l’écho qui te correspond à travers chaque projet.</p>
                        </div>
                    </div>
                  </div>       
                </div>              
            </div>
        );
    }
});

export default Component;
