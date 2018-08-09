import React from 'react';
import {Link} from 'react-router-dom';
import EditMoodboardForm from './EditMoodboard-form';


export default class Boardlist extends React.Component{

    render(){
        return (
            <ul>
           {
            this.props.moodboards.map(moodboard =>{
                // const index =  this.props.moodboardImages.indexOf(image);
                return <li key={moodboard.id}>
                <Link to={`/moodboards/${moodboard.id}`}>{moodboard.board_name}</Link>  
                <button onClick={() => this.props.deleteMoodboard(moodboard.id)}>Delete</button>
                <div id="edit-moodboard" style={this.state}>
                <EditMoodboardForm form={`editform_${moodboard.id}`} moodboardId={moodboard.id} userId={this.props.userId}/> 
                </div>
              
                </li>
              
            })
           } 
           </ul>
    );
  } 
}



