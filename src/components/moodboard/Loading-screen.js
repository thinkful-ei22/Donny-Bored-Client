import React from 'react';
import './loading.css';


export default function LoadingScreen(props) {

        if(props.loading){
            return(
                <div id="saving_screen" className="fadeIn">
                     <img src="../assets/revolve.gif" width="45" alt="Processing..."/>  <div className="status_message">  processing...</div>
                 </div>
            )
         } else {
             return(  
                <div  id="saving_screen" className="fadeOut">
                    <img src="../assets/revolve.gif" width="45" alt="Processing..."/>  <div className="status_message">  processing...</div>
                 </div>
                 )
         }


}