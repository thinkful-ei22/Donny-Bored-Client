import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './login.css';

import LoginForm from './Login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
     <main>   
     <div className="title">   <h1 className="mainTitle">bored</h1>  </div>
        <div className="home">
         
            <h2>A moodboard/collage app for freaks, neets and mums</h2>
            <LoginForm />
            <Link to="/register">Register</Link>
        </div>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
