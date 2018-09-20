import React, { Component } from "react"
import './Registration.css'

export default class Registration extends Component {

    state = {
        accountName: "",
        email: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    constructNewUser = evt => {
        evt.preventDefault()
        
         if (this.state.accountName === "" || this.state.email === "" || this.state.password === "") {
            window.alert("Please enter all of the info!")

        } else {
            const user = {
                accountName: this.state.accountName,
                email: this.state.email,
                password: this.state.password
            }

            this.props.post("users", user).then(() => this.props.history.push("/login"))
        }
    }

    cancelNewUser = () => {
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="login">
                <div className="formArea container d-flex flex-column">
                    <h1 className="gameTitle">World Of Apathetic Heroes</h1>
                    <form className="loginForm d-flex flex-column justify-content-center" onSubmit={this.handleLogin}>
                        <input className="formField" onChange={this.handleFieldChange} type="test" id="accountName" placeholder="Account Name" />
                        <br></br>
                        <input className="formField" onChange={this.handleFieldChange} type="email" id="email" placeholder="Email" />
                        <br></br>
                        <input className="formField" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" />
                        <br></br>
                        <div className="btnBackground">
                            <button className="newAccount btn gameBtn" type="submit" onClick={this.constructNewUser}>Register</button>
                        </div>
                        <br></br>
                        <div className="btnBackground">
                            <button className="cancelBtn btn gameBtn" type="button" onClick={this.cancelNewUser}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}