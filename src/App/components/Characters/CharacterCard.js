import React, { Component } from "react"
import "./Characters.css"

export default class CharacterCard extends Component {
    
    render() {

        // const matchedRace = this.props.races.find(race => race.id === this.props.character.raceID) || {}
        const matchedClass = this.props.classes.find(c => c.id === this.props.character.classID) || {}

        return (
            <div key={this.props.character.id} className="characterCard card d-flex flex-row">
                <div className="cardLeft">
                    <div className="characterName">
                        <h5>{this.props.character.name}</h5>
                    </div>
                    <div className="characterClass">
                        <h6>{/* matchedRace.name */} {matchedClass.name}</h6>
                    </div>
                </div>
                <button className="cardRight btn btn-danger" onClick={() => this.props.delete("characters", this.props.character.id)}><span roll="img">💀</span></button>
            </div>
        )
    }
}