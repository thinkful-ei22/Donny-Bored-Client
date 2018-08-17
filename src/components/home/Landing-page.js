import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import LogoMain from './LogoMain';
import './login.css';
import './landingpage.css';
import './mobile.css';

export function LandingPage (props) {
    // If we are logged in redirect straight to the user's dashboard    
        if (props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }

        return (
                <main className="content middle-align">   
                    <LogoMain/>
                   
                </main>
        );
    
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
