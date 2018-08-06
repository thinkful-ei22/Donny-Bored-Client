import React, { Component } from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux'
import Board from './components/moodboard/Board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
      <Board/>
      
      </div>
    );
  }
}
export default App;
