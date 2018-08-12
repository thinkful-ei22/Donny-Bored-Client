import React, { Component } from 'react';

export default class EditMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    };
    
  }
  

  render() {
   console.log('EDITMENU', this.props);
    if(this.props.editMode === 'delete'){
        return (
        <div id="edit-menu">
          <img src="../assets/redx.png"/>     
            <div id="flame" > 
            <button id="delete_button" onClick={()=>this.props.handleDelete()}>
            <img src="../assets/smallflame.gif" alt="Flame gif"/>
            </button> 
            </div>
        </div>
      
        );
    } else {
        return null
    }
    
    }
}