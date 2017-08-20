import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Excel from './components/Excel'
import { headers, data } from './data/app.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Excel headers={headers} initialData={data} />
      </div>
    );
  }
}

export default App;
