import React from 'react';
import {Link} from 'react-router-dom';


export default function Boardlist(props){
     
    return (
                <ul>
               {
                props.moodboards.map(moodboard =>{
                    // const index =  this.props.moodboardImages.indexOf(image);
                    return <li key={moodboard.id}>
                    <Link to={`/moodboards/${moodboard.id}`}>{moodboard.board_name}</Link>  
                    <button onClick={() => props.deleteMoodboard(moodboard.id)}>Delete</button>
                    </li>
                  
                })
               } 
               </ul>
      
        );
    }



