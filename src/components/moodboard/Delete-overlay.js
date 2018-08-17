import React from 'react';
import EditMenu from './EditMenu';


export default function DeleteOverlay(props){
     const styles={
            position:"absolute",
            left:"50%",
            top:"50%",
            transform:"translate(-50%,-50%)"
     }
    return(
    
      <div style={styles}>
            <EditMenu handleDelete={props.handleDelete} editMode={props.editMode}/>
      </div>
    )
}