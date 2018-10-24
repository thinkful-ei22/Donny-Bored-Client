import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './Login-form';

export function LoginPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home-registration fadeInFast">
            <div className="registration-form">
            <h2>Bored Login</h2>
            <p class="small-text">Demo user: jonny2lips Password: Misterbear9614</p>
            <LoginForm />
            <Link to="/">Back to Homepage</Link>
          
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
