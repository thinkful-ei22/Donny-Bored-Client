import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './Requires-login';
import {fetchProtectedData} from '../../actions/protected-data';
import MoodboardForm from './Moodboard-form';
import {Link} from 'react-router-dom';
import {fetchMoodboards} from '../../actions/moodboards';

import Boardlist from './Boardlist';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMoodboards(this.props.userId));
        console.log('THIS DASHBORD PROPS',this.props);
      
    }
          
    render() {

        if(!this.props || this.props.moodboards === undefined){
            return null; 
          }

          
        return (
          
            <div className="dashboard">
       
              <MoodboardForm userId={this.props.userId}/>
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>

               <div className="dashboard-name">Moodboards {this.props.name}></div>
               <Boardlist moodboards={this.props.moodboards}/>
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
