import React from 'react';
import {Link} from 'react-router-dom';
import EditMoodboardForm from './EditMoodboard-form';
import './grid.css';


export default class Boardlist extends React.Component{

  
    render(){

        if(!this.props || this.props.moodboards === undefined ){
           
            console.log('null moodboards');
            return null
          
        }

        if(!this.props.loading && this.props.moodboardIds.length<1){
            console.log('less than 1 moodboards');
            return  <div id="no_moodboards"><img src="../assets/board.gif" alt="Mona Lisa"/><h3>Hint: Get started by creating a new board.</h3> </div>
        }
      
       


        return (
            <ul className="board_list">
           {
            this.props.moodboardIds.map(moodboardId =>{
                // const index =  this.props.moodboardImages.indexOf(image);
                return <li key={moodboardId} >
                <h2><Link to={`/moodboards/${moodboardId}`}>{this.props.moodboards[moodboardId].board_name}</Link> </h2>
                     <div className="edit-moodboard" style={this.state}>
                         <EditMoodboardForm deleteMoodboard={this.props.deleteMoodboard} form={`editform_${moodboardId}`} moodboardId={moodboardId} userId={this.props.userId}/> 
                    </div>
                    {/* <div className="board_stats"></div> */}
                </li>
            })
           } 
           </ul>
    );
  } 
}



