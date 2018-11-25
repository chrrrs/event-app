import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEvent, deleteEvent, addParticipant } from '../store/actions/eventActions';

import { Button, Container, Form, Input, Image } from 'semantic-ui-react';
import Navbar from '../components/Navbar';

class CreateEvent extends Component {
    render() {
        // const { auth } = this.props;

        // if (!auth.uid) {
        //     return <Redirect to="/login" />
        // }        
        return (
            <React.Fragment>
                <Navbar pathObject={this.props.history} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => dispatch(createEvent(event)),
        deleteEvent: (event) => dispatch(deleteEvent(event)),
        addParticipant: (event) => dispatch(addParticipant(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent) 