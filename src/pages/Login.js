import React, { Component } from 'react'
import firebase from 'firebase';

export default class Login extends Component {
    state = {
        email: 'test@test.dk',
        password: 'test123',
        errors: [],
        isLoading: ''
    }

    login = () =>  {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then( user => {
                console.log(user);
            })
            .catch( error => {
                console.log(error);
            })
    }

    // isFormValid() {
    //     if (this.state.email.length > 0 && this.state.password.length > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        return(
            <div>
                <input type="email" name="email" id="_id-email" />
                <input type="password" name="password" id="_id-password" />
                <button onClick={this.login}>login</button>
            </div>
        )
    }
}