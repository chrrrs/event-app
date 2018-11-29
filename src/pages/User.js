import React, { Component } from 'react'

import { Container } from 'semantic-ui-react';
import Navbar from '../components/Navbar';

export default class User extends Component {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px auto' }}>
                        <svg style={{ width: '31px' }} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>icon_svg</title><path className="cls-1" d="M500,846.52c-194.89,0-353.45-158.56-353.45-353.45H249c0,138.41,112.6,251,251,251s251-112.6,251-251H853.45C853.45,688,694.89,846.52,500,846.52Z" /><circle className="cls-1" cx="214.26" cy="239.32" r="64.18" /></svg>
                        <h2 style={{ marginTop: '0', fontSize: '1.7rem', fontWeight: '800' }}>Connect</h2>
                    </div>
                </Container>
                <Container>
                    <div style={{ backgroundColor: '#0066FF', width: '40px', height: '40px', borderRadius: '100px'}}>

                    </div>
                </Container>
                <Navbar pathObject={this.props.history} />
            </React.Fragment>
        )
    }
}