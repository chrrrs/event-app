import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../store/actions/authActions';

import { Button, Form, Checkbox } from 'semantic-ui-react'
import { FormWrapper } from '../styles'

class Signup extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        checked: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.checked === true) {
            this.props.signUp(this.state);
        }
    }

    render() {
        const { auth, authError } = this.props;

        if(auth.uid) {
            return <Redirect to='/' />
        }

        return (
            <FormWrapper>
                <Form onSubmit={this.handleSubmit} size="big">
                    <Form.Field>
                        <label>Email</label>
                        <input type="text" id="email" placeholder="Email" onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>First Name</label>
                        <input type="text" id="firstName" placeholder="firstName" onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input type="text" id="lastName" placeholder="lastName" onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" id="password" placeholder="password" onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox onClick={() => {this.setState({checked: !this.state.checked})}}label='I agree to the Terms and Conditions' /> <a>read here</a>
                    </Form.Field>
                    <Button size="big">signup</Button>
                </Form>
                {
                    authError ?
                        <p style={{ color: 'red' }}>{authError}</p> :
                        null
                }
            </FormWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);