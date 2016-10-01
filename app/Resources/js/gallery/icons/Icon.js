import React, { Component } from 'react';
import ICONS from './angles';

class Icon extends Component {
    render () {
        return <span dangerouslySetInnerHTML={{ __html: ICONS[this.props.type] }} {...this.props} />;
    }
};

Icon.propTypes = {
    type: React.PropTypes.oneOf(Object.keys(ICONS))
}

module.exports = Icon;
