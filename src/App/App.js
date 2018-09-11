import React, { Component } from 'react';
import './App.css';

import ApplicationViews from './components/ApplicationViews'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApplicationViews />
      </div>
    );
  }
}

export default App;
