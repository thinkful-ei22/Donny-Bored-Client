import React, { Component } from 'react';
import './loading.css';


export default class LoadingScreen extends Component {
     
    render(){

        if(this.props.loading){
            return(
                <div id="saving_screen" className="fadeIn">
             <img src="../assets/revolve.gif" width="45"/>  <div className="status_message">  processing...</div>
           </div>
            )
         } else {
             return  <div  id="saving_screen" className="fadeOut">
           <img src="../assets/revolve.gif" width="45"/>  <div className="status_message">  processing...</div>
        </div>
         }

    }


}