import React, { Component } from 'react';

export default class EditMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    };
    
  }
  

  render() {
   console.log('EDITMENU', this.props);
    if(this.props.editMode){
        return (
        <div className="edit-menu">
          <img src="../assets/redx.png"/>     
           
                <button className="delete_button flame" onClick={()=>this.props.handleDelete()}>
                    <img src="../assets/smallflame.gif" alt="Flame gif"/>
                </button> 
          
        </div>
      
        );
    } else {
        return null
    }
    
    }
}