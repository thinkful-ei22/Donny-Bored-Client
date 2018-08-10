import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './Header-bar';
import LandingPage from './Landing-page';
import Dashboard from './Dashboard-page';
import Board from '../moodboard/Board';

import RegistrationPage from './Registration-page';
import LoginPage from './Login-page';
import {refreshAuthToken} from '../../actions/auth';
import IdleTimer from 'react-idle-timer';

export class App extends React.Component {
   
    
    
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }


     componentOnMount(){
        this.idleTimer = null;
        this.onActive = this._onActive.bind(this);
       this.onIdle = this._onIdle.bind(this);
       console.log('MY APP PROPS',this.props);


     }

     _onActive(e) {
        console.log('user is active', e)
        console.log('time remaining', this.idleTimer.getRemainingTime())
      }
     
      _onIdle(e) {
        console.log('user is idle', e)
        console.log('last active', this.idleTimer.getLastActiveTime())
      }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
           
            <div className="app">
             <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            timeout={1000 * 12}>
             
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/moodboards/:boardId" component={Board} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/login" component={LoginPage} />
                </IdleTimer>
            </div>
           
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
