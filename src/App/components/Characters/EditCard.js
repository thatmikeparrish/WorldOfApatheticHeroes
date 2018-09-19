import React, { Component } from "react"
import "./Characters.css"

export default class CharacterCard extends Component {
    state = {
        character: {},
        cardEdit: false
    }

    editCharacterCard = () => {
        this.setState({
            cardEdit: true,
        })
    }

    toggle = () => {
        this.setState({
            cardEdit: !this.state.cardEdit,
        })
    }

    handleFieldChange = (evt) => {
        const updateCharacter = this.state.character;
        updateCharacter[evt.target.id] = evt.target.value
        this.setState({updateCharacter})
    }

    editCharacterName = evt => {
        evt.preventDefault()
       
           const character = {
                name: this.state.character.name
           }
           this.props.edit("characters", character, this.props.character.id)
           console.log("characters", character, this.props.character.id)
           this.setState({cardEdit: false});
    }

    render() {

        const matchedRace = this.props.races.find(race => race.id === this.props.character.raceID) || {}
        const matchedClass = this.props.classes.find(c => c.id === this.props.character.classID) || {}

        return (
            <div key={this.props.character.id} className="editCardBackground">
                <div className="editCard">
                    <div className="d-flex justify-content-around flex-column">
                        {
                            (this.state.cardEdit) ?
                                <input type="text" className="formField" id="name" onChange={(evt)=>{this.handleFieldChange(evt)}} defaultValue={this.props.character.name} />
                                :
                                <h5 className="characterName">{this.props.character.name}</h5>
                        }

                            <h6 className="characterInfo">Level {this.props.character.level} {matchedRace.name} {matchedClass.name}</h6>

                    </div>
                    {
                        (this.state.cardEdit) ?
                            <div className="d-flex justify-content-around flex-row">
                                <div className="editBtnBackground">
                                    <button onClick={this.editCharacterName} className="btn editNameBtn">Save</button>
                                </div>
                                <div className="editBtnBackground">
                                    <button onClick={this.toggle} className="btn editNameBtn">Cancel</button>
                                </div>
                            </div>
                            :
                            <div className="editBtnBackground">
                                <button onClick={this.toggle} className="btn editNameBtn">Change Name</button>
                            </div>
                    }
                </div>
            </div >
        )
    }
}