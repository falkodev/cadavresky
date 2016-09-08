import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Layout = React.createClass({
    getInitialState: function() {
        return {
            transparentContent: false,
            movedLp: false,
            onLoad: true,
        };
    },
    handleToggleMenu: function(transparentContent) {
        this.setState({
            transparentContent: transparentContent,
        });
    },
    render: function() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={2}>
                        <Header transparentContent={ this.state.transparentContent } onToggle={this.handleToggleMenu} />
                    </Col>
                    <Col sm={10}>
                        <div className={ this.state.transparentContent ?  "content transparent" : "content" }>
                          { this.props.children }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className={ this.state.transparentContent ?  "footer transparent" : "footer" }>
                        <Footer />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

export default Layout;
