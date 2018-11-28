import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Menu, Icon } from 'semantic-ui-react';
import { ActivityButton } from '../styles';

class Navbar extends Component {
    state = {
        activeItem: ''
    }

    handleToCreate = () => {
        this.props.pathObject.push('/create')
    }

    setActivityButton = () => {
        const { pathname } = this.props.pathObject.location
        
        if (pathname.includes('event') && this.props.isAttending === false) {
            return <ActivityButton onClick={this.props.submit}>
                        <Icon className="icon__check" size="large" />
                    </ActivityButton>
        } else if (pathname.includes('event') && this.props.isAttending === true) {
            return <ActivityButton onClick={this.props.submit}>
                        <Icon className="icon__cross" size="large" />
                    </ActivityButton>
        }

        switch(pathname) {
            case '/':
                return <ActivityButton onClick={this.handleToCreate}>
                            <Icon className="icon__plus" size="large" />
                        </ActivityButton>
            case '/create':
                return <ActivityButton onClick={this.props.submit}>
                            <Icon className="icon__check" size="large" />
                        </ActivityButton>
            case '/points':
                return <ActivityButton onClick={this.props.submit}>
                            <Icon className="" size="large" />
                        </ActivityButton>
            case '/user':
                return <ActivityButton onClick={this.props.submit}>
                            <Icon className="" size="large" />
                        </ActivityButton>
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
                            <Icon className="icon__home" size="large"/>
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                        name='point'
                    >
                        <Link to="/">
                            <Icon className="icon__location" size="large"/>
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
                        <Link to="/points">
                            <Icon className="icon__points" size="large"/>
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                        name='user'
                    >
                        <Link to="/user">
                            <Icon className="icon__user" size="large"/>
                        </Link>
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