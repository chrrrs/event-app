import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../store/actions/authActions';

import { Container, Button, List } from 'semantic-ui-react';
import Navbar from '../components/Navbar';

class User extends Component {
    state = {
        open: false
    }

    revealDelete = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { profile } = this.props;
        return (
            <React.Fragment>
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px auto' }}>
                        <svg style={{ width: '31px' }} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>icon_svg</title><path className="cls-1" d="M500,846.52c-194.89,0-353.45-158.56-353.45-353.45H249c0,138.41,112.6,251,251,251s251-112.6,251-251H853.45C853.45,688,694.89,846.52,500,846.52Z" /><circle className="cls-1" cx="214.26" cy="239.32" r="64.18" /></svg>
                        <h2 style={{ marginTop: '0', fontSize: '1.7rem', fontWeight: '800' }}>Connect</h2>
                    </div>
                </Container>
                <Container style={{ position: 'absolute', bottom: '120px' }}>
                    <h3>Profile</h3>
                    <List>
                        <List.Item>
                            <List.Content>
                                <List.Header as='a'>{`${profile.firstName} ${profile.lastName}`}</List.Header>
                                <List.Description>
                                    You have {' '}
                                    <a href="/points">
                                        <b>{profile.points} points</b>
                                    </a>{' '}
                                    to spare, visit the points store to gain discounts.
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                    <p onClick={this.revealDelete}>Press here to delete your account.</p>
                    {
                        this.state.open && 
                        <Button negative fluid style={{ marginBottom: '20px' }}>Delete Account</Button>
                    }
                    <Button disabled fluid style={{ marginBottom: '20px', backgroundColor: '#3b5998', color: 'white' }}>Connect with Facebook</Button>
                    <div>
                        <Link to="/login">
                            <Button onClick={this.props.signOut} fluid>Sign Out</Button>
                        </Link>
                    </div>
                </Container>
                <Navbar pathObject={this.props.history} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)