import React, { Component } from 'react'
import "./Characters.css"

import CharacterCard from './CharacterCard'


export default class CharactersList extends Component {

    render() {
        //console.log("Current User ID", this.props.user.id)
        // const filteredCharacters = this.props.characters.filter(character => character.userID === this.props.user.id)

        return (
            <React.Fragment>

                <div className="characterList">
                    <div className="characterDeck">
                        {
                            this.props.characters.map(character =>
                                <CharacterCard key={character.id} character={character} {...this.props} races={this.props.races} classes={this.props.classes} />
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}