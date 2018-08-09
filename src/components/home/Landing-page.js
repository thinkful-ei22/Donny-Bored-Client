import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LogoMain from './LogoMain';
import './login.css';
import './landingpage.css';
import LoginForm from './Login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
     
        
     <main class="content middle-align">   
           <LogoMain/>
        <div className="home">
         
            {/* <h2>A moodboard/collage app for freaks, neets and mums</h2> */}
            {/* <LoginForm /> */}
     
            <Link to="/register">Sign Up</Link><span> | <Link to="/login"> Login</Link> </span>
        </div>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
