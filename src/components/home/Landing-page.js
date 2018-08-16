import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LogoMain from './LogoMain';
import './login.css';
import './landingpage.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
     
        
     <main className="content middle-align">   
           <LogoMain/>
        <div className="home">
         
            {/* <LoginForm /> */}
     
            <Link to="/register"><button>Sign Up</button></Link><span> | <Link to="/login"><button> Login</button></Link> </span>
        </div>
        </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
