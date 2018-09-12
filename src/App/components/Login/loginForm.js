import React, { Component } from "react"
import './login.css'
import APIManager from "../../modules/APIManager";


export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault();
        APIManager.getAll("users")
        .then(users => {
            let email = users.find(u => u.email === this.state.email);
            let password = users.find(u => u.password === this.state.password);
            if(email && password){
                sessionStorage.setItem("user", JSON.stringify(email, password))
                this.props.history.push("/dashboard")
            } else {
                window.alert("You have entered an incorrect email or password!")
            }
        })
    }

    registerNewAccount = () => {
        this.props.history.push("/registration")
    }

    render() {
        return (
            <div className="login">
                <form className="loginForm" onSubmit={this.handleLogin}>
                    <h1 className="">Please sign in</h1>
                    <input onChange={this.handleFieldChange} type="email" id="email" placeholder="Email" />
                    <input onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" />
                    <button className="loginSubmit btn" type="submit">Sign in</button>
                </form>
                <button className="newAccount btn" type="other" onClick={this.registerNewAccount}>Register</button>
            </div>
        )
    }
}