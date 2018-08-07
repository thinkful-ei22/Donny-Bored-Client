import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';
import ButtonTest from './ButtonTest';


export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    showForm(){
        this.props.dispatch(this.showForm());
    }


    componentDidMount() {
   
        console.log('THIS BUTTON REDIRECT PROPS',this.props);
      
    } 

    

    render() {
        // Only render the log out button if we are logged in
        let logOutButton = (
            <button onClick={() => this.logOut()}>Log out</button>
        );

        
        if (this.props.loggedIn) {
           
            return (
                <div className="header-bar">
                    {/* <h1>Bored</h1> */}
                    {logOutButton}
                  <ButtonTest/>
                </div>
            );
          
        } else return null;
     
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
