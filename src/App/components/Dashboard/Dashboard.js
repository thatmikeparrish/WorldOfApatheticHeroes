import React, { Component } from "react"
import './Dashboard.css'
import CharacterList from '../Characters/CharacterList'
import EditCard from '../Characters/EditCard'
import APIManager from '../../modules/APIManager'

import gladiator from '../Characters/img/gladiator.png'
import crusader from '../Characters/img/crusader.png'
import cleric from '../Characters/img/cleric.png'
import necromancer from '../Characters/img/necromancer.png'
import sorcerer from '../Characters/img/sorcerer.png'
import witchDoctor from '../Characters/img/witchDoctor.png'
import pirate from '../Characters/img/pirate.png'
import ranger from '../Characters/img/ranger.png'


export default class Dashboard extends Component {

    state = {
        user: null,
        characters: [],
        activeCharacter: {},
        edit: false
    }

    componentDidMount() {
        let newState = {};
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ user })
        APIManager.getAllCharactersByUserID(user.id, "characters")
            .then(characters => { newState.characters = characters })
            .then(() => APIManager.getAllCharactersByUserID(user.id, "characters"))
            .then(activeCharacter => { newState.activeCharacter = activeCharacter[0] || []})        
            .then(() => {
                this.setState(newState)
            })
    }

    logoutButton = () => {
        sessionStorage.removeItem("user")
        this.props.history.push("/")
    }

    addCharacter = () => {
        this.props.history.push("/new-character")
    }

    editCharacters = () => {
        this.setState({
            edit: true,
        })
    }

    cancelEditCharacter = () => {
        this.setState({
            edit: false,
        })
    }

    delete = (resource, id) => {
        APIManager.delete(resource, id)
            .then(() => APIManager.getAllCharactersByUserID(this.state.user.id, resource))
            .then(returnObject => this.setState({ [resource]: returnObject }))
    }

    edit = (resource, updateItem, id) => {
        APIManager.update(resource, updateItem, id)
            .then(() => APIManager.getAllCharactersByUserID(this.state.user.id, resource))
            .then(returnObject => this.setState({ [resource]: returnObject }))
    }

    makeActiveCharacter = (id) => {
        this.setState({ activeCharacter: id })
    }



    render() {
        let style = "dashboard d-flex"

        if (this.state.activeCharacter.raceID === 1) {
            style = "highElf d-flex";
        } else if (this.state.activeCharacter.raceID === 3) {
            style = "human d-flex"
        } else if (this.state.activeCharacter.raceID === 5) {
            style = "dwarf d-flex"
        } else if (this.state.activeCharacter.raceID === 7) {
            style = "gnome d-flex"
        } else if (this.state.activeCharacter.raceID === 2) {
            style = "darkElf d-flex"
        } else if (this.state.activeCharacter.raceID === 4) {
            style = "orc d-flex"
        } else if (this.state.activeCharacter.raceID === 6) {
            style = "troll d-flex"
        } else if (this.state.activeCharacter.raceID === 8) {
            style = "minotaur d-flex"
        }

        let classImage = ""
        let className = ""

        if (this.state.activeCharacter.classID === 1) {
            classImage = gladiator
            className = "gladiator"
        } else if (this.state.activeCharacter.classID === 2) {
            classImage = crusader
            className = "crusader"
        } else if (this.state.activeCharacter.classID === 3) {
            classImage = cleric
            className = "cleric"
        } else if (this.state.activeCharacter.classID === 4) {
            classImage = necromancer
            className = "necromancer"
        } else if (this.state.activeCharacter.classID === 5) {
            classImage = sorcerer
            className = "sorcerer"
        } else if (this.state.activeCharacter.classID === 6) {
            classImage = witchDoctor
            className = "witchDoctor"
        } else if (this.state.activeCharacter.classID === 7) {
            classImage = pirate
            className = "pirate"
        } else if (this.state.activeCharacter.classID === 8) {
            classImage = ranger
            className = "ranger"
        }

        return (
            <React.Fragment>
                {
                    (this.state.edit) ?

                        <div className="CharacterEdit">
                            <div className="cardMat">
                                <div className="cardDeck d-flex justify-content-center flex-row flex-wrap">
                                {
                                    this.state.characters.map(character =>
                                        <EditCard {...this.props}
                                            key={character.id} 
                                            character={character}  
                                            edit={this.edit}
                                            delete={this.delete} 
                                            races={this.props.races} 
                                            classes={this.props.classes} 
                                            activeCharacter={this.props.activeCharacter} 
                                            makeActiveCharacter={this.props.makeActiveCharacter}
                                            user={this.props.user}/>
                                    )
                                }
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="buttonBox">
                                        <div className="btnBackground">
                                            <button className="btn addCharacter"
                                                onClick={this.cancelEditCharacter}>Back</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={style}>
                            <div className="leftSide">
                                <div className="leftTop d-flex justify-content-center">
                                    <img className={className} src={classImage} alt={className}/>
                                </div>
                                <div className="leftBottom d-flex">
                                    <div className="leftBottomLeft d-flex flex-column">
                                        <div className="btnBackground">
                                            <button type="button"
                                                className="logoutBtn btn"
                                                onClick={this.logoutButton}>Logout</button>
                                        </div>
                                    </div>
                                    <div className="leftBottomRight d-flex justify-content-center">
                                        <div className="btnBackground">
                                            <button className="playButton btn">
                                                <h2>Play</h2>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rightSide">
                                <div className="characterList d-flex flex-column">
                                    <CharacterList delete={this.delete}
                                        user={this.state.user}
                                        characters={this.state.characters}
                                        races={this.props.races}
                                        classes={this.props.classes}
                                        makeActiveCharacter={this.makeActiveCharacter}
                                        activeCharacter={this.state.activeCharacter} />
                                    {
                                        (this.state.characters.length !== 8) ?
                                            <div className="buttonBox">
                                                <div className="d-flex justify-content-center flex-column">
                                                    <div className="btnBackground">
                                                        <button className="btn addCharacter"
                                                            onClick={this.editCharacters}>Edit Characters</button>
                                                    </div>
                                                    <div className="btnBackground3">
                                                        <button className="btn addCharacter"
                                                            onClick={this.addCharacter}>Create New Character</button>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="buttonBox">
                                                <div className="btnBackground">
                                                    <button className="btn addCharacter"
                                                        onClick={this.editCharacters}>Edit Characters</button>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                }
            </React.Fragment>
        )
    }
}