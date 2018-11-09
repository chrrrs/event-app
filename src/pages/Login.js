import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../store/actions/authActions';

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
    }

    render() {
        const { authError } = this.props

        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type="email" id="email" onChange={this.handleChange}/>
                <input type="password" id="password" onChange={this.handleChange}/>
                <button>Login</button>
            </form>
            {
                authError ? 
                <p style={{ color: 'red' }}>{authError}</p>:
                null
            }
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)