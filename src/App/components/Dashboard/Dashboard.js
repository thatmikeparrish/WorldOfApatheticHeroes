import React, { Component } from "react"
import './Dashboard.css'
import CharacterList from '../Characters/CharacterList'
import APIManager from '../../modules/APIManager'


export default class Dashboard extends Component {

    state = {
        user: null,
        characters: [],
        activeCharacter: 0
    }

    componentDidMount() {
        let newState = {};
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({user})
        APIManager.getAllCharactersByUserID(user.id, "characters")
        .then(characters => {newState.characters = characters})
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

    delete = (resource, id) => {APIManager.delete(resource, id)
        .then(() => APIManager.getAllCharactersByUserID(this.state.user.id, resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }

    makeActiveCharacter = (id) => {
        console.log("active character", this.state.activeCharacter)
        this.setState({activeCharacter: id})
        
    }

    /* style = () => {
        if(this.state.activeCharacter.raceID === 1) {
            let style =  "human";
            return style
        }

    } */

    render() {
        let style = "dashboard d-flex"

        if(this.state.activeCharacter.raceID === 1) {
            style = "highElf d-flex";
        } else if (this.state.activeCharacter.raceID === 2) {
            style = "human d-flex"
        } else if (this.state.activeCharacter.raceID === 3) {
            style = "dwarf d-flex"
        } else if (this.state.activeCharacter.raceID === 4) {
            style = "gnome d-flex"
        } else if (this.state.activeCharacter.raceID === 5) {
            style = "darkElf d-flex"
        } else if (this.state.activeCharacter.raceID === 6) {
            style = "orc d-flex"
        } else if (this.state.activeCharacter.raceID === 7) {
            style = "troll d-flex"
        } else if (this.state.activeCharacter.raceID === 8) {
            style = "minotaur d-flex"
        }

        return (
            <div className={style}>
                <div className="leftSide">
                    <div className="leftTop">
                        <div className="characterImage">
                            <p>Character</p>
                        </div>
                    </div>
                    <div className="leftBottom d-flex">
                        <div className="leftBottomLeft d-flex flex-column">
                            <div className="btnBackground">
                                <button type="button" className="logoutBtn btn" onClick={this.logoutButton}>Logout</button>
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
                        <CharacterList delete={this.delete} user={this.state.user} characters={this.state.characters} races={this.props.races} classes={this.props.classes} makeActiveCharacter={this.makeActiveCharacter} activeCharacter={this.state.activeCharacter}/>
                        {
                        (this.state.characters.length !== 9) ?
                            <div className="d-flex justify-content-center">
                                <div className="btnBackground">
                                    <button className="btn addCharacter" onClick={this.addCharacter}>Create New Character</button>
                                </div>
                            </div>

                        :
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}