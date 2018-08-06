import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/home/App';
import registerServiceWorker from './registerServiceWorker';
import { imagesReducer} from './reducers';
import { authReducer} from './reducers/auth';
import {reducer as formReducer} from 'redux-form';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({images:imagesReducer,auth:authReducer, form:formReducer});

const store = createStore(
    rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
 <Provider store={store}>
     <Router>
       <App />
      </Router>
  </Provider>,
   document.getElementById('root')
  );
registerServiceWorker();
