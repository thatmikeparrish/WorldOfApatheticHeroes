import React, { Component } from "react"
import "./Characters.css"

export default class CharacterCard extends Component {
    state = {
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

    render() {

        const matchedRace = this.props.races.find(race => race.id === this.props.character.raceID) || {}
        const matchedClass = this.props.classes.find(c => c.id === this.props.character.classID) || {}

        return (
            <div key={this.props.character.id} className="editCardBackground">
                <div className="editCard">
                    <div className="d-flex justify-content-around flex-row">
                    {
                        (this.state.cardEdit) ?
                            <input type="text" className="formField" id="name" placeholder="Name" defaultValue={this.props.character.name} />
                            :
                            <h5 className="characterName">{this.props.character.name}</h5>
                    }
                </div>
                <div className="characterInfo">
                    <h6>Level {this.props.character.level} {matchedRace.name} {matchedClass.name}</h6>
                </div>
                {
                    (this.state.cardEdit) ?
                        <div className="d-flex justify-content-around flex-row">
                            <div className="btnBackground">
                                <button onClick={this.toggle} className="btn characterNameBtn">Save</button>
                            </div>
                            <div className="btnBackground">
                                <button onClick={this.toggle} className="btn characterNameBtn">Cancel</button>
                            </div>
                        </div>
                        :
                        <div className="btnBackground">
                            <button onClick={this.toggle} className="btn editNameBtn">Change Name</button>
                        </div>
                }
            </div>
            </div >
        )
    }
}