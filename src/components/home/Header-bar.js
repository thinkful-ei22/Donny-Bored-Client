import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import {clearMoodboards} from '../../actions/moodboards';



export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        this.props.dispatch(clearMoodboards());
      //  console.log('CLEARING MOODBOARDS');
        clearAuthToken();
    }

    showForm(){
        this.props.dispatch(this.showForm());
    }


    componentDidMount() {
   
       // console.log('THIS BUTTON REDIRECT PROPS',this.props);
      
    } 

    

    render() {
        // Only render the log out button if we are logged in
        let logOutButton = (
            <button onClick={() => this.logOut()}>Log out</button>
        );

        
        if (this.props.loggedIn) {
           
            return (
                <nav className="header-bar" role="navigation">
                    {/* <h1>Bored</h1> */}
                    {logOutButton}
                 
                </nav>
            );
          
        } else return null;
     
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
