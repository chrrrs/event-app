import React, { Component } from 'react'
import { connect } from 'react-redux';
import { completeChallenge, addPoints } from '../store/actions/eventActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Accordion, Icon, Input, Button, Form } from 'semantic-ui-react';

class Challenge extends Component {
    state = { 
        activeIndex: 1,
        userCheck: '',
        random_color: '' 
    }

    componentDidMount() {
        const colors = ['#9A86DC', '#83E3D8', '#F6C1E8', '#9BAEF4', '#FD7D76', '#FFCF92', '#89C4E2', '#DBD3F7'];
        const random_color = colors[Math.floor(Math.random() * colors.length)];

        this.setState({ random_color })
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
                <Accordion.Title style={{ backgroundColor: this.state.random_color, borderRadius: '4px 4px 0 0' }} active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    {isCompleted.length > 0 ? <Icon name='check' /> : null}
                    {challenge.challengeTitle}
                    <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content style={{ borderRadius: '0 0 4px 4px', backgroundColor: this.state.random_color, opacity: '.75', color: 'white', fontWeight: '600' }} active={activeIndex === 0}>
                    <p>{challenge.challengeDesc}</p>
                    <div></div>
                    <p>Award: {challenge.points} points</p>
                    {
                        isCompleted.length > 0 ?
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