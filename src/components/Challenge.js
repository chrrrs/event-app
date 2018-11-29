import React, { Component } from 'react'
import { connect } from 'react-redux';
import { completeChallenge, addPoints } from '../store/actions/eventActions';

import { Accordion, Icon, Input, Button, Form } from 'semantic-ui-react';

class Challenge extends Component {
    state = { activeIndex: 1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleCompletedChallenge = (eventID, challengeID, userID, points) => {
        this.props.completeChallenge(eventID, challengeID)
        this.props.addPoints(userID, points)
    }

    render() {
        const { activeIndex } = this.state
        const { challenge, eventID, auth } = this.props

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
                            <Input placeholder="insert code" />
                            <Button>Check</Button>
                        </Form>
                    }
                </Accordion.Content>
            </Accordion>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        completeChallenge: (event, challenge) => dispatch(completeChallenge(event, challenge)),
        addPoints: (user, points) => dispatch(addPoints(user, points)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge)