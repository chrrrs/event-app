import React, { Component } from 'react'

export default class Login extends Component {
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
        
        console.log(this.state)
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type="email" id="email" onChange={this.handleChange}/>
                <input type="password" id="password" onChange={this.handleChange}/>
                <button>Login</button>
            </form>
        </div>
        )
    }
}
