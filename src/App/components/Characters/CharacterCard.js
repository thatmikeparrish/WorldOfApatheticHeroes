import React, { Component } from "react"
import "./Characters.css"

export default class CharacterCard extends Component {
    render() {
        return (
            <div key={this.props.character.id} className="characterCard card d-flex flex-row">
                <div className="cardLeft">
                    <div className="characterName">
                        <h5>{this.props.character.name}</h5>
                    </div>
                    <div className="characterClass">
                        <h6>{this.props.character.raceID} {this.props.character.classID}</h6>
                    </div>
                </div>
                <button className="cardRight btn btn-danger" type="button"><span roll="img">💀</span></button>
            </div>
        )
    }
}