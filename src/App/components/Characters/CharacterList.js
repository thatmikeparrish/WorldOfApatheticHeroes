import React, { Component } from 'react'
import "./Characters.css"

import CharacterCard from './CharacterCard'


export default class CharactersList extends Component {
    render() {
        const ThisAccountCharacters = this.props.characters.filter(character => character.userID !== true)


        return (
            <React.Fragment>

                <div className="characterList">
                    <div className="characterDeck">
                        {
                            ThisAccountCharacters.map(character =>
                                <CharacterCard key={character.id} character={character} {...this.props} />
                            )
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}