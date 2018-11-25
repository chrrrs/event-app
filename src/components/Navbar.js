import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Menu, Icon, Button } from 'semantic-ui-react';
import { ActivityButton } from '../styles';

class Navbar extends Component {
    handleToCreate = () => {
        this.props.pathObject.push('/create')
    }

    setActivityButton = () => {
        const { pathname } = this.props.pathObject.location

        switch(pathname) {
            case '/':
                return <ActivityButton createPage onClick={this.handleToCreate}></ActivityButton>
            case '/create':
                return <ActivityButton createEvent onClick={this.handleToCreate}></ActivityButton>
            default:
                return <ActivityButton hello></ActivityButton>
        }
    }

    render() {
        const { auth } = this.props;

        if (!auth.uid) {
            return <Redirect to="/login" />
        }   

        return (
            <React.Fragment>
                <Menu fluid borderless widths="5" className="navbar__fix">
                    <Menu.Item name='home'>
                        <Link to="/">
                            <Icon name='home' size="large"/>
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                        name='point'
                    >
                        <Link to="/login">
                            <Icon name='point' size="large"/>
                        </Link>
                    </Menu.Item>

                    <Menu.Item>
                        <div style={{ position: 'absolute', bottom: '25px' }}>
                            {this.setActivityButton()}
                        </div>
                    </Menu.Item>

                    <Menu.Item
                        name='trophy'
                    >
                        <Icon name='trophy' size="large"/>
                    </Menu.Item>

                    <Menu.Item
                        name='user'
                    >
                        <Icon name='user' size="large"/>
                    </Menu.Item>
                </Menu>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        projects: state.firestore.ordered.events,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createEvent: (event) => dispatch(createEvent(event)),
        // deleteEvent: (event) => dispatch(deleteEvent(event)),
        // addParticipant: (event) => dispatch(addParticipant(event)),
        // removeParticipant: (event) => dispatch(removeParticipant(event)),
        // signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)