import React from 'react';
import {Link} from 'react-router-dom';
import EditMoodboardForm from './EditMoodboard-form';
import './grid.css';


export default class Boardlist extends React.Component{

    render(){
        return (
            <ul className="board_list">
           {
            this.props.moodboards.map(moodboard =>{
                // const index =  this.props.moodboardImages.indexOf(image);
                return <li key={moodboard.id} >
                <h2> <Link to={`/moodboards/${moodboard.id}`}>{moodboard.board_name}</Link> </h2>
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



