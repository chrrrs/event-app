import React, { Component } from 'react'

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        area: ''
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
                    <input type="email" id="email" onChange={this.handleChange} />
                    <input type="password" id="password" onChange={this.handleChange} />
                    <input type="text" id="firstName" onChange={this.handleChange} />
                    <input type="text" id="lastName" onChange={this.handleChange} />
                    <input type="text" id="area" onChange={this.handleChange} />
                    <button>Login</button>
                </form>
            </div>
        )
    }
}
