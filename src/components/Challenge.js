import React, { Component } from 'react'
import { connect } from 'react-redux';
import { completeChallenge, addPoints } from '../store/actions/eventActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Accordion, Icon, Input, Button, Form } from 'semantic-ui-react';

class Challenge extends Component {
    state = { 
        activeIndex: 1,
        userCheck: '' 
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleChange = (e) => {
        this.setState({
            userCheck: e.target.value
        })
    }

    handleCompletedChallenge = (eventID, challengeID, userID, points) => {
        const { userCheck } = this.state;

        if(this.props.users[userCheck]) {
            this.props.completeChallenge(eventID, challengeID)
            this.props.addPoints(userID, points)
        }
    }

    render() {
        const { activeIndex } = this.state
        const { challenge, eventID, auth, isAttending, isCompleted } = this.props

        return (
            <Accordion fluid styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    {challenge.completed ? <Icon name='check' /> : null}
                    {challenge.challengeTitle}
                    <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <p>{challenge.challengeDesc}</p>
                    <div></div>
                    <p>Award: {challenge.points} points</p>
                    {
                        challenge.completed ?
                        <p>Great job, you already finished this challenge!</p> :
                        <Form onSubmit={() => this.handleCompletedChallenge(eventID, challenge.id, auth.uid, challenge.points)}>
                            <Input placeholder="insert code" disabled={isCompleted.length > 0 || !isAttending} onChange={this.handleChange}/>
                            <Button disabled={isCompleted.length > 0 || !isAttending}>Check</Button>
                        </Form>
                    }
                </Accordion.Content>
            </Accordion>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.firestore.data.events,
        users: state.firestore.data.users,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeChallenge: (event, challenge) => dispatch(completeChallenge(event, challenge)),
        addPoints: (user, points) => dispatch(addPoints(user, points)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        { collection: 'users' }
    ])
)(Challenge)