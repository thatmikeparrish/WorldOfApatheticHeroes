import React, { Component } from "react"
import "./Characters.css"

export default class CharacterCard extends Component {

    render() {

        const matchedRace = this.props.races.find(race => race.id === this.props.character.raceID) || {}
        const matchedClass = this.props.classes.find(c => c.id === this.props.character.classID) || {}

        return (
            <div key={this.props.character.id}
                    className={
                        (this.props.activeCharacter.id === this.props.character.id ?
                            "characterCardActive card d-flex flex-row"
                            :
                            "characterCard card d-flex flex-row")
                    }
                    onClick={() => this.props.makeActiveCharacter(this.props.character)}>
                <div className="cardLeft">
                    <div className="characterName">
                        <h5>{this.props.character.name}</h5>
                    </div>
                    <div className="characterClass">
                        <h6>Level {this.props.character.level} {matchedRace.name} {matchedClass.name}</h6>
                    </div>
                </div>
                <div className="btnBackground cardRight">
                    <button className="btn deleteBtn"
                        onClick={() => this.props.delete("characters", this.props.character.id)}><span role="img" aria-label="Skull">💀</span></button>
                </div>
            </div>
        )
    }
}