import React from 'react';

export default function EditMenu(props) {
 
    if(props.editMode){
        return (
        <div className="edit-menu">
          <img src="../assets/redx.png" alt="delete" title="Click to delete"/>           
                <button className="delete_button flame" onClick={()=>props.handleDelete()}>
                    <img src="../assets/smallflame.gif" alt="Flame gif"/>
                </button>       
        </div>
      
        );
    } else {
        return null
    }
}