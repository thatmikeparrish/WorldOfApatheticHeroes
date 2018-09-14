import React, { Component } from 'react'
import "./Characters.css"

import CharacterCard from './CharacterCard'


export default class CharactersList extends Component {
    
    render() {
        //console.log("Current User ID", this.props.user.id)
        // const filteredCharacters = this.props.characters.filter(character => character.userID === this.props.user.id)

        return (
            <React.Fragment>

                <div className="characterDeck">
                    {
                        this.props.characters.map(character =>
                            <CharacterCard key={character.id} character={character} {...this.props} changeBackground={this.props.changeBackground} delete={this.props.delete} races={this.props.races} classes={this.props.classes} />
                        )
                    }
                    {
                        (this.props.characters.length !== 10) ?
                            <div className="d-flex justify-content-center">
                                <button className="btn addCharacter" onClick={this.props.addCharacter}>Add New Character</button>
                            </div>

                        :
                            <div></div>
                    }
                </div>
            </React.Fragment>
        )
    }
}