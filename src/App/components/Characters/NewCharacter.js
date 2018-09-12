import React, { Component } from "react"
import "./Characters.css"

export default class NewCharacter extends Component {

    state = {
        name: "",
        race: "",
        class: "",
        userID: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewCharacter = evt => {
        evt.preventDefault()
        if (this.state.title === "") {
            window.alert("Please enter a task")
        } else {
            const character = {
                name: this.state.name,
                raceID: this.props.races.find(a => a.name === this.state.race).id,
                classID: this.props.classes.find(e => e.name === this.state.class).id,
                //userId: this.props.user.id
            }

            this.props.post("characters", character).then(() => this.props.history.push("/dashboard"))
        }
    }

    cancelNewCharacter = () => {
        this.props.history.push("/dashboard")
    }

    render() {
        return (
            <React.Fragment>
                <div className="characterScreen">
                    <form className="">
                        <input type="text" className="form-control" onChange={this.handleFieldChange} id="name" placeholder="Name" />
                        <select defaultValue="" name="race" id="race" onChange={this.handleFieldChange}>
                            <option value="">Select a race</option>
                            {
                                this.props.races.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
                            }
                        </select>

                        <select defaultValue="" name="class" id="class" onChange={this.handleFieldChange}>
                            <option value="">Select a class</option>
                            {
                                this.props.classes.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
                            }
                        </select>
                        <div className="">
                            <button type="button" onClick={this.constructNewCharacter} className="btn">Submit</button>
                            <button type="cancel" onClick={this.cancelNewCharacter} className="btn">Cancel</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}