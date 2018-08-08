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

export const createMoodboard = (info) => (dispatch,getState) => {
    console.log('cREATE MOODBOARD...',info);
    const authToken = getState().auth.authToken;
 //  dispatch(fetchMoodboardsRequest(user_id));
    return fetch(`${API_BASE_URL}/api/moodboards`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json'
        },
        body: JSON.stringify(info)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
       // console.log('FETCH MOODBOARD SUCCESS',res.json());
        return res.json();
      })
      .then(data => {
           dispatch(fetchMoodboards(info.user_id));
          console.log('CREATE NWE MOODBOARD SUCESSFUL',data)
       // dispatch(fetchMoodboardsSuccess(data));
      })
      .catch(err => {
         //dispatch(fetchMoodboardsError(err));
      });
  };
  



//DELETE MOODBOARD RELATED ACTIONS
export const DELETE_MOODBOARD_SUCCESS = 'DELETE_MOODBOARDS_SUCCESS';
export const deleteMoodboardSuccess = (board_id) => ({
  type: DELETE_MOODBOARD_SUCCESS,
  board_id
});

export const SET_MOODBOARD_ID = 'SET_MOODBOARD_ID';
export const setMoodboardId = (board_id) => ({
  type: SET_MOODBOARD_ID,
  board_id
})



export const deleteMoodboard = (board_id, user_id) => (dispatch,getState) => {
    console.log('dELETE MOODBOARD...',board_id,user_id);
    const authToken = getState().auth.authToken;
 // dispatch(fetchMoodboardsRequest(user_id));
    return fetch(`${API_BASE_URL}/api/moodboards/${board_id}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${authToken}`,
        'content-type': 'application/json'
        }
        //body: JSON.stringify()
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log('DELET MOODBOARD SUCESSFUL',res)
        dispatch(fetchMoodboards(user_id));
        //return res.json();
      })
      .catch(err => {
      //  dispatch(fetchMoodboardsError(err));
      });
  };



