import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Excel from './components/Excel'
import { headers, data } from './data/app.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Excel headers={headers} initialData={data} />
      </div>
    );
  }
}

export default App;
