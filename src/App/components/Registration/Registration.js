import React, { Component } from "react"
import './Registration.css'

/* import APIManager from '../../modules/APIManager' */


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
            <div className="registration">
                <form className="registerForm" onSubmit={this.handleLogin}>
                    <h1 className="">Register for a new account!</h1>
                    <input className="" onChange={this.handleFieldChange} type="test" id="accountName" placeholder="Account Name" />
                    <input className="" onChange={this.handleFieldChange} type="email" id="email" placeholder="Email" />
                    <input className="" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" />
                    <button className="newAccount" type="submit" onClick={this.constructNewUser}>Register</button>
                    <button className="cancelBtn" type="button" onClick={this.cancelNewUser}>Cancel</button>
                </form>
            </div>
        )
    }
}