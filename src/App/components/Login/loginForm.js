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
                if (email && password) {
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
                <div className="formArea container d-flex flex-column">
                    <h1 className="gameTitle">World Of Apathetic Heroes</h1>
                    <form className="loginForm d-flex flex-column justify-content-center" onSubmit={this.handleLogin}>
                        <input className="formField" onChange={this.handleFieldChange} type="text" id="email" placeholder="Email" />
                        <br></br>
                        <input className="formField" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" />
                        <div className="loginBtn btnBackground">
                            <button className="gameBtn btn" type="submit">Login</button>
                        </div>
                    </form>
                    <div className="registerBtn btnBackground">
                        <button className="gameBtn btn" type="button" onClick={this.registerNewAccount}>Create Account</button>
                    </div>
                </div>
            </div>
        )
    }
}