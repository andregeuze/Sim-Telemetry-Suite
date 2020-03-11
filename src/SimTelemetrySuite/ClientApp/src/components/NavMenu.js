import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse style={{marginBottom: 0}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>SpaTemplate</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem to={'/home'}>
                            <Glyphicon glyph='home' /> Home
                        </NavItem>
                        <NavItem to={'/dashboard'}>
                            <Glyphicon glyph='education' /> Dashboard
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
