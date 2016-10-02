import React, { PropTypes } from 'react';
import history from './helpers/history';
import { NavItem } from 'react-bootstrap';

const Link = React.createClass({

  handleClick: function(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    history.push({
      pathname: event.currentTarget.pathname,
      search: event.currentTarget.search,
    });
  },

  render: function() {
    const { to, navItem, ...props } = this.props;
    let link = <a href={history.createHref(to)} {...props} onClick={this.handleClick} />;
    if (navItem) { link = <NavItem href={history.createHref(to)} {...props} onClick={this.handleClick} /> }

    return link;
  }

});

export default Link;
