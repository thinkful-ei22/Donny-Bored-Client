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
  console.log('fetching moodboards...',user_id);
  fetchMoodboardsRequest();
  const authToken = getState().auth.authToken;
  dispatch(fetchMoodboardsRequest(user_id));
  return fetch(`${API_BASE_URL}/api/moodboards/?user_id=${user_id}`, {
    method: 'GET',
    headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchMoodboardsSuccess(data));
    })
    .catch(err => {
      dispatch(moodboardActionError(err));
    });
};



//CREATE MOODBOARD RELATED ACTIONS

export const CREATE_MOODBOARD_REQUEST = 'CREATE_MOODBOARDS_REQUEST';
export const createMoodboardRequest=()=>({
  type:CREATE_MOODBOARD_REQUEST
});


export const CREATE_MOODBOARD_SUCCESS = 'CREATE_MOODBOARD_SUCCESS';
export const createMoodboardSuccess=(data)=>({
  type:CREATE_MOODBOARD_SUCCESS,
  data
})

export const CREATE_MOODBOARD_ERROR = 'CREATE_MOODBOARD_ERROR';
export const createMoodboardError=(error)=>({
  type:CREATE_MOODBOARD_ERROR,
  error
})

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
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(data => {
           dispatch(fetchMoodboards(info.user_id));
          console.log('CREATE NWE MOODBOARD SUCESSFUL',data)
       // dispatch(fetchMoodboardsSuccess(data));
      })
      .catch(err => {
        dispatch(moodboardActionError(err));
      });
  };
  





export const SET_MOODBOARD_ID = 'SET_MOODBOARD_ID';
export const setMoodboardId = (board_id) => ({
  type: SET_MOODBOARD_ID,
  board_id
})


export const EDIT_MOODBOARD_REQUEST='EDIT_MOODBOARD_REQUEST';
export const editMoodboardRequest = ()=>({
  type:EDIT_MOODBOARD_REQUEST
});

export const EDIT_MOODBOARD_SUCCESS='EDIT_MOODBOARD_SUCCESS';
export const editMoodboardSuccess = (board_id) =>({
  type:EDIT_MOODBOARD_SUCCESS,
  board_id
});

export const EDIT_MOODBOARD='EDIT_MOODBOARD';
export const editMoodboard = (board_id,info) => (dispatch, getState) =>{
  editMoodboardRequest();
  console.log('EDITING MOODBOARD...');
  console.log('userid',info)
  const authToken=getState().auth.authToken;
  return fetch(`${API_BASE_URL}/api/moodboards/${board_id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body:JSON.stringify(info)
  })
    .then(()=> dispatch(fetchMoodboards(info.user_id)));

}

//DELETE MOODBOARD RELATED ACTIONS
export const DELETE_MOODBOARD_SUCCESS = 'DELETE_MOODBOARDS_SUCCESS';
export const deleteMoodboardSuccess = (board_id) => ({
  type: DELETE_MOODBOARD_SUCCESS,
  board_id
});

export const DELETE_MOODBOARD_REQUEST = 'DELETE_MOODBOARDS_REQUEST';
export const deleteMoodboardRequest= () => ({
  type: DELETE_MOODBOARD_REQUEST
});

export const MOODBOARD_ACTION_ERROR = 'MOODBOARD_ACTION_ERROR';
export const moodboardActionError= (error) => ({
  type: MOODBOARD_ACTION_ERROR,
  error
});



export const DELETE_MOODBOARD='DELETE_MOODBOARD';
export const deleteMoodboard = (board_id, user_id) => (dispatch, getState) => {
  console.log('dELETE MOODBOARD...', board_id, user_id);
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/api/moodboards/${board_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    }

  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      console.log('DELETE MOODBOARD SUCESSFUL', res)
      dispatch(fetchMoodboards(user_id));
      //return res.json();
    })
    .catch(err => {
       dispatch(moodboardActionError(err));
    });
};



//CLEAR STORE IMAGE ARRAY
export const CLEAR_MOODBOARDS = 'CLEAR_MOODBOARDS';
export const clearMoodboards=()=>({
    type:CLEAR_MOODBOARDS
});



