import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../../actions/auth';
import {clearAuthToken} from '../../local-storage';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }


    createNewBoard(){

        this.props.dispatch();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let createBoardButton;
        let deleteBoardButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
            createBoardButton = (
                <button >Create New Bored</button>
            );
          
        }
        return (
            <div className="header-bar">
                {/* <h1>Bored</h1> */}
                {logOutButton}
                {createBoardButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
