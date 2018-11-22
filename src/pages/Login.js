import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';
import { withRouter, Redirect } from 'react-router-dom';

import { Button, Form } from 'semantic-ui-react'
import { FormWrapper } from '../styles'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signIn(this.state)
        this.props.history.push('/')
    }

    render() {
        const { authError, auth } = this.props

        if(auth.uid) {
            return <Redirect to="/" />
        }

        return (
            <FormWrapper>
                <Form onSubmit={this.handleSubmit} size="big">
                    <Form.Field>
                        <label>Email</label>
                        <input type="email" id="email" placeholder="email" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field size="big">
                        <label>Password</label>
                            <input type="password" id="password" placeholder="password" onChange={this.handleChange}/>
                    </Form.Field>
                    <Button size="big">Login</Button>
                </Form>
                {
                    authError ? 
                    <p style={{ color: 'red' }}>{authError}</p>:
                    null
                }
            </FormWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))