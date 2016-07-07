(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("Resources/js/app", function(exports, require, module) {
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentJs = require('./component.js');

var _componentJs2 = _interopRequireDefault(_componentJs);

_reactDom2['default'].render(_react2['default'].createElement(_componentJs2['default'], null), document.getElementById('app'));
});

require.register("Resources/js/component", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Component = _react2["default"].createClass({
  displayName: "Component",

  render: function render() {
    return _react2["default"].createElement(
      "div",
      null,
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "div",
          { className: "row" },
          _react2["default"].createElement(
            "div",
            { className: "col-sm-2" },
            _react2["default"].createElement("img", { className: "logo", id: "logo-default", src: "../images/CADAVRESKY-small-black-logo.png" }),
            _react2["default"].createElement(
              "div",
              { className: "sidebar-nav" },
              _react2["default"].createElement(
                "div",
                { className: "navbar navbar-default", role: "navigation" },
                _react2["default"].createElement(
                  "div",
                  { className: "navbar-header" },
                  _react2["default"].createElement(
                    "button",
                    { type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": ".sidebar-navbar-collapse" },
                    _react2["default"].createElement("span", { className: "sr-only" }),
                    _react2["default"].createElement("span", { className: "icon-bar" }),
                    _react2["default"].createElement("span", { className: "icon-bar" }),
                    _react2["default"].createElement("span", { className: "icon-bar" })
                  ),
                  _react2["default"].createElement(
                    "span",
                    { className: "visible-xs navbar-brand" },
                    _react2["default"].createElement("img", { className: "logo", id: "logo-mobile", src: "../images/CADAVRESKY-small-black-logo.png" })
                  )
                ),
                _react2["default"].createElement(
                  "div",
                  { className: "navbar-collapse collapse sidebar-navbar-collapse" },
                  _react2["default"].createElement(
                    "ul",
                    { className: "nav navbar-nav menu" },
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(
                        "a",
                        { href: "#", className: "menu-whoswho active" },
                        "Who's who"
                      )
                    ),
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(
                        "a",
                        { href: "#", className: "menu-projectology" },
                        "Projectology"
                      )
                    ),
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(
                        "a",
                        { href: "#", className: "menu-zoo" },
                        "The zoo"
                      )
                    ),
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(
                        "a",
                        { href: "#", className: "menu-shop" },
                        "Shop"
                      )
                    ),
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(
                        "a",
                        { href: "#", className: "menu-goodies" },
                        "Goodies"
                      )
                    ),
                    _react2["default"].createElement(
                      "li",
                      null,
                      _react2["default"].createElement(
                        "a",
                        { href: "#", className: "menu-contact" },
                        "Contact"
                      )
                    )
                  )
                )
              )
            )
          ),
          _react2["default"].createElement(
            "div",
            { className: "col-sm-10" },
            _react2["default"].createElement(
              "div",
              { className: "content" },
              _react2["default"].createElement(
                "p",
                null,
                "Il était une fois en 2015, une envie naquit au coin de la rue. L’idée un peu surréaliste de créer une jungle vestimentaire, en grattant les strates de nos restes populaires."
              ),
              _react2["default"].createElement(
                "p",
                null,
                "CADAVRESKY c’est le pied de nez au bras tendu des tendances actuelles. Sans concession, ni contre-façon."
              ),
              _react2["default"].createElement(
                "p",
                null,
                "CADAVRESKY propose à ton plumage un voyage au pays de la préhistoire contemporaine. A consommer sans modération en un cocktail bien frappé des cultures urbaines, street art et pop."
              ),
              _react2["default"].createElement(
                "p",
                null,
                "CADAVRESKY fait un tout avec rien et surtout, plus que tout, recherche, retrouve, décompose, recompose, un savoir-faire artisanal par le travail de la pièce unique pour des êtres uniques."
              ),
              _react2["default"].createElement(
                "p",
                null,
                "CADAVRESKY décale les codes, pour jouer de styles, en proposant une vision alternative de se penser avec classe et t’invite à trouver l’écho qui te correspond à travers chaque projet."
              )
            )
          )
        )
      )
    );
  }
});

exports["default"] = Component;
module.exports = exports["default"];
/*<li className="dropdown">
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
<li><a href="#">Reviews <span className="badge">1,118</span></a></li>*/
});


//# sourceMappingURL=app.js.map