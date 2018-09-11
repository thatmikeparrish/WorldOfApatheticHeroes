import React, { Component } from "react"
import './Dashboard.css'


export default class Dashboard extends Component {

    

    render() {
        return (
            <div className="dashboard">                
                <div className="row">
                    <div className="col d-flex flex-column">
                        <button>Account Info</button>
                        <button>Logout</button>
                    </div>
                    <div className="col">
                        <div>Character</div>
                        <button>Play</button>
                    </div>
                    <div className="col">
                        <div className="characterListBackground d-flex flex-column">
                            <div className="characterList">Character List</div>
                            <div>
                                <button>Add New Character</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}