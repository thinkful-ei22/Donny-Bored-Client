import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './Requires-login';
import MoodboardForm from './Moodboard-form';

import {Link} from 'react-router-dom';
import {fetchMoodboards} from '../../actions/moodboards';
import {deleteMoodboard} from '../../actions/moodboards';
import {editMoodboard} from '../../actions/moodboards';
import './dashboard.css';
import Boardlist from './Boardlist';
import HeaderBar from './Header-bar';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMoodboards(this.props.userId));
        console.log('THIS DASHBORD PROPS',this.props);
      
    }
        
    
    deleteMoodboard(moodboard_id,user_id){
         
        this.props.dispatch(deleteMoodboard(moodboard_id,user_id));

    }

    editMoodboard(board_id,moodboardInfo,user_id){
        this.props.dispatch(editMoodboard(board_id,moodboardInfo,user_id))
        
    }

    render() {

        if(!this.props || this.props.moodboards === undefined){
            return null; 
          }

          
        return (
        
            <div className="dashboard">
                <div className="dashboard-username">
                  Howdy {this.props.username} !
                </div> 
                <HeaderBar />
                <br/><br/>
               <p>What's new? Always different, always bored. </p>
              <MoodboardForm userId={this.props.userId}/>
             <div className="board-list-container">

               <div className="dashboard-name">Your creations:{this.props.name}</div>
               <Boardlist userId={this.props.userId} moodboards={this.props.moodboards} deleteMoodboard={(board_id)=>this.deleteMoodboard(board_id,this.props.userId)}/>
               
               
               
               </div>
               </div>
                
        );
    }
}
    

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        userId:state.auth.currentUser.id,
        moodboards:state.moodboards.data
    
       // name: `${currentUser.firstName} ${currentUser.lastName}`,
       // protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
