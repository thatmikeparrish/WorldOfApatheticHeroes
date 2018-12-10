import React, { Component } from "react"
import "./Characters.css"
import "./NewCharacter.css"

import gladiator from '../Characters/img/gladiator.png'
import crusader from '../Characters/img/crusader.png'
import cleric from '../Characters/img/cleric.png'
import necromancer from '../Characters/img/necromancer.png'
import sorcerer from '../Characters/img/sorcerer.png'
import witchDoctor from '../Characters/img/witchDoctor.png'
import pirate from '../Characters/img/pirate.png'
import ranger from '../Characters/img/ranger.png'

export default class NewCharacter extends Component {

    state = {
        name: "",
        race: "",
        class: "",
        level: "",
        userID: "",
        activeRace: 1,
        activeClass: 1
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.setState({ user })
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewCharacter = evt => {
        evt.preventDefault()
        if (this.state.name === "" || this.state.activeRace === "" || this.state.activeClass === "") {
            window.alert("Please select your characters Race and Class, then enter your characters Name.")
        } else {
            const character = {
                name: this.state.name,
                raceID: this.state.activeRace,
                classID: this.state.activeClass,
                level: 1,
                userID: this.state.user.id
            }
            this.props.post("characters", character).then(() => this.props.history.push("/dashboard"))
        }
    }

    cancelNewCharacter = () => {
        this.props.history.push("/dashboard")
    }

    makeActiveRace = (id) => {
        this.setState({ activeRace: id })
    }

    makeActiveClass = (id) => {
        this.setState({ activeClass: id })
    }

    render() {

        console.log("current user:", this.state.user)

        let style = "newCharacterScreen"

        if (this.state.activeRace === 1) {
            style = "highElf";
        } else if (this.state.activeRace === 3) {
            style = "human"
        } else if (this.state.activeRace === 5) {
            style = "dwarf"
        } else if (this.state.activeRace === 7) {
            style = "gnome"
        } else if (this.state.activeRace === 2) {
            style = "darkElf"
        } else if (this.state.activeRace === 4) {
            style = "orc"
        } else if (this.state.activeRace === 6) {
            style = "troll"
        } else if (this.state.activeRace === 8) {
            style = "minotaur"
        }

        let classImage = ""
        let className = ""

        if (this.state.activeClass === 1) {
            classImage = gladiator
            className = "gladiator"
        } else if (this.state.activeClass === 2) {
            classImage = crusader
            className = "crusader"
        } else if (this.state.activeClass === 3) {
            classImage = cleric
            className = "cleric"
        } else if (this.state.activeClass === 4) {
            classImage = necromancer
            className = "necromancer"
        } else if (this.state.activeClass === 5) {
            classImage = sorcerer
            className = "sorcerer"
        } else if (this.state.activeClass === 6) {
            classImage = witchDoctor
            className = "witchDoctor"
        } else if (this.state.activeClass === 7) {
            classImage = pirate
            className = "pirate"
        } else if (this.state.activeClass === 8) {
            classImage = ranger
            className = "ranger"
        }

        return (
            <React.Fragment>
                <div className={style}>
                    <div className="newCharacterTop">
                        <div className="newCharacterLeft">
                            <div className="raceWindow d-flex flex-wrap">
                                {
                                    this.props.races.map(race => 
                                        <div key={race.id} className=
                                            {
                                                (this.state.activeRace === race.id ?
                                                `${race.className}Icon activeIcon`
                                                :
                                                `${race.className}Icon inActiveIcon`)
                                            } 
                                            onClick={() => this.makeActiveRace(race.id)}></div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="newCharacterMiddle">
                            <div className="classImage d-flex justify-content-center">
                                <img className={className} src={classImage} alt={className}/>
                            </div>
                        </div>
                        <div className="newCharacterRight d-flex justify-content-end">   
                            <div  className="classWindow d-flex flex-wrap">
                                {
                                    this.props.classes.map(e => 
                                        <div key={e.id} className={
                                            (this.state.activeClass === e.id ?
                                            `${e.className}Icon activeIcon`
                                            :
                                            `${e.className}Icon inActiveIcon`)
                                        } onClick={() => this.makeActiveClass(e.id)}></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="nameBox">
                        <div className="d-flex justify-content-center">
                            <input type="text" className="formField" onChange={this.handleFieldChange} id="name" placeholder="Name" />
                        </div>
                        <div className="buttonBox2 d-flex justify-content-center">
                            <div className="btnBackground2">
                                <button type="cancel" onClick={this.cancelNewCharacter} className="btn addCharacter">Cancel New Character</button>
                            </div>
                            <div className="btnBackground2">
                                <button type="button" onClick={this.constructNewCharacter} className="btn addCharacter">Save New Character</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}