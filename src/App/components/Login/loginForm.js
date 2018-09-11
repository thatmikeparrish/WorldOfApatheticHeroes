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
            let emailExists = users.find(u => u.email === this.state.email);
            if(emailExists){
                sessionStorage.setItem("user", JSON.stringify(emailExists))
                this.props.history.push("/dashboard")
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
                    <input className="" onChange={this.handleFieldChange} type="email" id="email" placeholder="Email" />
                    <input className="" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" />
                    <button className="loginSubmit" type="submit">Sign in</button>
                </form>
                <button className="newAccount" type="other" onClick={this.registerNewAccount}>Register</button>
            </div>
        )
    }
}