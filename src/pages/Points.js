import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPoints, removePoints } from '../store/actions/eventActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Container, Form, Input } from 'semantic-ui-react';
import Navbar from '../components/Navbar';

class Points extends Component {
    state = {
        user: '',
        number: ''
    }

    handleSelectCategory = (e, { value }) => {
        this.setState({
            user: value
        });
    }

    handleNumberInput = (e) => {
        this.setState({
            number: e.target.value
        })
    }

    handlePoints = () => {
        const { user, number } = this.state;
        if( user !== '' && 
            number <= this.props.profile.points &&
            this.props.profile.points !== 0) {
            this.props.addPoints(user, parseInt(number))
            this.props.removePoints(this.props.auth.uid, parseInt(number))
            } else {
                alert('Something went wrong, you are probably trying to use too many points.')
            }
    }

    render() {
        const { profile, users } = this.props;
        
        return (
            <React.Fragment>
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px auto' }}>
                        <svg style={{ width: '31px' }} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>icon_svg</title><path className="cls-1" d="M500,846.52c-194.89,0-353.45-158.56-353.45-353.45H249c0,138.41,112.6,251,251,251s251-112.6,251-251H853.45C853.45,688,694.89,846.52,500,846.52Z" /><circle className="cls-1" cx="214.26" cy="239.32" r="64.18" /></svg>
                        <h2 style={{ marginTop: '0', fontSize: '1.7rem', fontWeight: '800' }}>Connect</h2>
                    </div>
                </Container>
                <Container className="points__container">
                    <div className="points">
                        <h1 style={{ textAlign: 'center' }}>
                            {profile.points && profile.points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }  
                            <span>points</span>
                        </h1>
                        <p>Select a user or company profile down below, select the amount you wish to spend and click send. Your points will arrive shortly to its intended user and you can enjoy one of our many discounts.</p>
                    </div>
                    <div>
                        <Form>
                            <Form.Field>
                                {
                                    users &&
                                    <Form.Select 
                                        id="users" 
                                        placeholder="Select a user" 
                                        options={users.map(user => {
                                            return { key: user.id, text: user.organization && user.organization.length > 1 ? user.organization : `${user.firstName} ${user.lastName}`, value: user.id }
                                        })} 
                                        onChange={this.handleSelectCategory} />
                                }
                            </Form.Field>
                            <Form.Field>
                                <Input fluid type="number" max={profile.points} onChange={this.handleNumberInput} />
                            </Form.Field>
                        </Form>
                    </div>
                </Container>
                <Navbar pathObject={this.props.history} sendPoints={this.handlePoints} />                
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPoints: (user, points) => dispatch(addPoints(user, points)),
        removePoints: (user, points) => dispatch(removePoints(user, points))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Points);