import React from 'react';
import {Redirect} from 'react-router-dom';

export default class ButtonTest extends React.Component {
 
  
  state = {
      toDashboard: false,
    }
    handleSubmit = () => {
       this.setState(() => ({
          toDashboard: true
        }))
    }
    render() {

      
      if (this.state.toDashboard === true) {
        return <Redirect to='/dashboard' />
      }
  
      return (
        <div>
         
          <button onClick={this.handleSubmit}> Dashboard </button>
        </div>
      )
    }
  }