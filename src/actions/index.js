import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';




//GET MOODBOARD RELATED ACTIONS
export const FETCH_MOODBOARDS_REQUEST = 'FETCH_MOODBOARDS_REQUEST';
export const fetchMoodboardsRequest = () => ({
  type: FETCH_MOODBOARDS_REQUEST
});

export const FETCH_MOODBOARDS_SUCCESS = 'FETCH_MOODBOARDS_SUCCESS';
export const fetchMoodboardsSuccess = (data) => ({
  type: FETCH_MOODBOARDS_SUCCESS,
  data
});
export const FETCH_MOODBOARDS_ERROR = 'FETCH_MOODBOARDS_ERROR';
export const fetchMoodboardsError = (error) => ({
  type: FETCH_MOODBOARDS_ERROR,
  error
});

export const FETCH_MOODBOARDS = 'FETCH_MOODBOARDS';
export const fetchMoodboards = (user_id) => (dispatch,getState) => {
  console.log('fetching...',user_id);
  const authToken = getState().auth.authToken;
  dispatch(fetchMoodboardsRequest(user_id));
  return fetch(`${API_BASE_URL}/api/moodboards/?user_id=${user_id}`, {
    method: 'GET',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
     // console.log('FETCH MOODBOARD SUCCESS',res.json());
      return res.json();
    })
    .then(data => {
      dispatch(fetchMoodboardsSuccess(data));
    })
    .catch(err => {
      dispatch(fetchMoodboardsError(err));
    });
};



//CREATE MOODBOARD RELATED ACTIONS

export const CREATE_MOODBOARD_REQUEST = 'CREATE_MOODBOARDS_REQUEST';
export const createMoodboardRequest = (data) => ({
  type: CREATE_MOODBOARD_REQUEST,
  data
});

export const CREATE_MOODBOARD_SUCCESS = 'CREATE_MOODBOARD_SUCCESS';
export const createMoodboardSuccess = () =>({
  tyype:CREATE_MOODBOARD_SUCCESS
});

export const CREATE_MOODBOARD_ERROR = 'CREATE_MOODBOARD_ERROR';
export const createMoodboardError = (error) =>({
  type:CREATE_MOODBOARD_ERROR,
  error
});