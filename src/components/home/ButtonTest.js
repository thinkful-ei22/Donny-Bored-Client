import React from 'react';
import {Redirect} from 'react-router-dom';
import {
  withRouter
} from 'react-router-dom'


class ButtonTest extends React.Component {
 
    handleSubmit = () => {
      this.props.history.push('/dashboard');
      console.log('BUTTON TEST HISTORY',this.props.history.location.pathname==='/dashboard');
    }
    render() {
     
      return (
        
         
          <button onClick={this.handleSubmit}> Dashboard </button>
 
      )
    }
    
  }

  export default withRouter(ButtonTest)