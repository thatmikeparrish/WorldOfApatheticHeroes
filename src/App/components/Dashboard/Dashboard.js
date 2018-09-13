import React, { Component } from "react"
import './Dashboard.css'
import CharacterList from '../Characters/CharacterList'
import APIManager from '../../modules/APIManager'


export default class Dashboard extends Component {

    state ={
        user: null,
        characters: []
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

    render() {
        return (
            <div className="dashboard d-flex">
                <div className="leftSide">
                    <div className="leftTop">
                        <div className="characterImage">
                            <p>Character</p>
                        </div>
                    </div>
                    <div className="leftBottom d-flex">
                        <div className="leftBottomLeft d-flex flex-column">
                            <button className="optionBtn btn">Account Info</button>
                            <button type="button" className="optionBtn btn" onClick={this.logoutButton}>Logout</button>
                        </div>
                        <div className="leftBottomRight d-flex justify-content-center">
                            <button className="playButton btn">Play</button>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="characterListBackground d-flex flex-column">
                        <div className="characterList">
                            <CharacterList user={this.state.user} characters={this.state.characters} races={this.props.races} classes={this.props.classes}/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn" onClick={this.addCharacter}>Add New Character</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}