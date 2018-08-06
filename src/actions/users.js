import { API_BASE_URL } from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

export const SET_USER = 'SET_USER';
export const setUser = user => ({
  type: SET_USER,
  user
});


export const registerUser = user => dispatch => {
  console.log('REGISTer uSER',user);
  return fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
          // Convert ValidationErrors into SubmissionErrors for Redux Form
          return Promise.reject(
              new SubmissionError({
                  [location]: message
              })
          );
      }
  });
};

export const changeUserName = (id, username) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/username`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ username })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(setUser(user)));
};

export const changeFirstName = (id, firstname) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/firstname`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ firstname })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(setUser(user)));
};

export const validatePassword = (id, username, password) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/password`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json());
};

export const resetPassword = (id, password) => (dispatch, getState) => {
  return fetch(`${API_BASE_URL}/user/${id}/reset`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getState().auth.authToken}`
    },
    body: JSON.stringify({ password })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json());
};