import { API_BASE_URL } from '../config';
import {fetchMoodboards} from './moodboards';


//GET IMAGE RELATED ACTIONS
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const fetchImagesRequest = () => ({
    type: FETCH_IMAGES_REQUEST
});

export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const fetchImagesSuccess = (moodboardImages) =>({
    
    type:FETCH_IMAGES_SUCCESS,
    moodboardImages:moodboardImages
});

//{console.log('SUCCESSS!!',moodboardImages)};

export const FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR';
export const fetchImagesError = error => ({
    type: FETCH_IMAGES_ERROR,
    error
});


export const FETCH_IMAGES = 'FETCH_IMAGES';
export const fetchImages = (boardId) => (dispatch, getState)=> {
    console.log('FETCHING...');
    const authToken = getState().auth.authToken;
    dispatch(fetchImagesRequest());
    return fetch(`${API_BASE_URL}/api/moodboards/${boardId}`, {
    method: 'GET',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
  }
	}).then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      //  console.log(res.json());
        return res.json();
      })
      .then(data => {
         // console.log('dispatching imagees...');
        dispatch(fetchImagesSuccess(data));
      })
      .catch(err => {
        dispatch(fetchImagesError(err));
      });
}


//UPLOAD IMAGE
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const uploadImage = (files) =>({
    type:UPLOAD_IMAGE,
    files

});


//UPDATE IMAGE
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const updateImage =(imageId,xpos,ypos,width,height) =>({
    type:UPDATE_IMAGE,
    imageId,
    xpos,
    ypos,
    width,
    height
});

//SAVE IMAGE
export const SAVE_IMAGES_REQUEST = 'SAVE_IMAGES_REQUEST';
export const saveImagesRequest =(imageId,xpos,ypos,width,height) =>({
    type:SAVE_IMAGES_REQUEST,
    imageId,
    xpos,
    ypos,
    width,
    height
});

//DELETE IMAGE

export const DELETE_IMAGE= 'DELETE_IMAGE';
export const deleteImage = (imageId,board_id) => (dispatch, getState)=> {
    console.log('DELETING...',imageId,board_id);
    const authToken = getState().auth.authToken;
   // dispatch(fetchImagesRequest());
    return fetch(`${API_BASE_URL}/api/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
  }
	}).then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        dispatch(fetchImages(board_id));
        console.log('DELETED',res);
        //return res.json();
      })
      .then(data => {
         // console.log('dispatching imagees...');
       
      })
      .catch(err => {
        dispatch(fetchImagesError(err));
      });
}


//CLEAR STORE IMAGE ARRAY
export const CLEAR_IMAGES = 'CLEAR_IMAGES';
export const clearImages=()=>({
    type:CLEAR_IMAGES
});

