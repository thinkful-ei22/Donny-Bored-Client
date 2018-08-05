import React, { Component } from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux'
import Moodboard from './moodboard';
import Dragtest from './dragtest';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
      <Moodboard/>
      
      </div>
    );
  }
}
export default App;
