import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './Requires-login';
import {fetchProtectedData} from '../../actions/protected-data';
import {Link} from 'react-router-dom';
import {fetchMoodboards} from '../../actions';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMoodboards(this.props.userId));
        console.log('THIS DASHBORD PROPS',this.props);
      
    }
          
    render() {

        if(!this.props || this.props.moodboards == undefined){
            return null; //You can change here to put a customized loading spinner 
          }


        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Moodboards {this.props.name}</div>
                <ul>
        
             {
              this.props.moodboards.map(moodboard =>{
                // const index =  this.props.moodboardImages.indexOf(image);
                return <li key={moodboard.id}>
                <Link to={`/moodboards/${moodboard.id}`}>{moodboard.board_name}</Link>
                </li>
                // return  <DragRect imageId={imageId} key={imageId} image={this.props.allImages[imageId]} dispatcher={(xpos,ypos,width,height)=>this.updateImage(imageId,xpos,ypos,width,height)}></DragRect>
               })
              } 
              
            </ul>

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
