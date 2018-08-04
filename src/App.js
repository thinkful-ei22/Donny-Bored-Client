import React, { Component } from 'react';
import logo from './logo.svg';
import {connect} from 'react-redux'
import Basic from './dropzone';
import Dragtest from './dragtest';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
      <Basic />
      
      </div>
    );
  }
}
export default App;
