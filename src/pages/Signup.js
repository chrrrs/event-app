import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../store/actions/authActions';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { auth, authError } = this.props;

        if(auth.uid) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="email" onChange={this.handleChange} />
                    <input type="password" id="password" onChange={this.handleChange} />
                    <input type="text" id="firstName" onChange={this.handleChange} />
                    <input type="text" id="lastName" onChange={this.handleChange} />
                    <button>signup</button>
                </form>
                {
                    authError ?
                        <p style={{ color: 'red' }}>{authError}</p> :
                        null
                }
            </div>
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