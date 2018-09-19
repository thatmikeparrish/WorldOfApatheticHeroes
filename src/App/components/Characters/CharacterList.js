import React, { Component } from 'react'
import "./Characters.css"

import CharacterCard from './CharacterCard'


export default class CharactersList extends Component {

    
    render() { 
        
        return (
            <React.Fragment>

                <div className="characterDeck">
                    <div className="characters">
                    {
                        this.props.characters.map(character =>
                            <CharacterCard {...this.props}
                                key={character.id} 
                                character={character}  
                                delete={this.props.delete} 
                                races={this.props.races} 
                                classes={this.props.classes} 
                                activeCharacter={this.props.activeCharacter} 
                                makeActiveCharacter={this.props.makeActiveCharacter}/>
                        )
                    }
                    </div>   
                </div>
            </React.Fragment>
        )
    }
}