import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <Grid fluid style={{ height: '100vh' }}>
                <Row>
                    <NavMenu />
                </Row>
                <Row>
                    <Col sm={12} style={{ height: '100%', paddingLeft: 0, paddingRight: 0 }}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
