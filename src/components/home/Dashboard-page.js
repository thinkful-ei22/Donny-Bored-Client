import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './Requires-login';
import MoodboardForm from './Moodboard-form';
import {clearImages} from '../../actions/images';
import {editMoodboard, deleteMoodboard,fetchMoodboards} from '../../actions/moodboards';
import './dashboard.css';
import './grid.css';
import Boardlist from './Boardlist';
import HeaderBar from './Header-bar';


export class Dashboard extends React.Component {

    componentWillMount(){
        this.props.dispatch(clearImages());
    }

    componentDidMount() {
        this.props.dispatch(fetchMoodboards(this.props.userId));
        console.log('THIS DASHBORD PROPS',this.props);
    }

    componentWillUnmount(){
       
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
            <div className="dashboard fadeInFast">
                <div className="dashboard-header">
                    <div className="dashboard-username">
                        <strong>  Howdy {this.props.username} !   <img src="assets/wavey.gif" alt="Howdy" title="Howdy" /> </strong>
                        </div> 
                        <HeaderBar />
                    </div>
                <br/>
               <p className="normal-text">What's new? Always different, always bored. </p>
               <div className="container">
                    <div id="dashboard-side-bar">
                        <MoodboardForm userId={this.props.userId}/>
                    </div>
                <div className="board-list-container">
                       
                     <Boardlist loading={this.props.moodboardLoading} userId={this.props.userId} moodboards={this.props.moodboards} moodboardIds={this.props.moodboardIds} deleteMoodboard={(board_id)=>this.deleteMoodboard(board_id,this.props.userId)}/>
               </div>
               </div>
            </div> 
        );
    }
}
    

const mapStateToProps = state => {
    // const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        userId:state.auth.currentUser.id,
        moodboards:state.moodboards.data,
        moodboardIds:state.moodboards.boardIds,
        moodboardLoading:state.moodboards.loading
    
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
