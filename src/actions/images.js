import { API_BASE_URL } from '../config';



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
    dispatch(fetchImagesRequest());
    return fetch(`${API_BASE_URL}/api/moodboards/${boardId}`, {
		method: 'GET'
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



export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const updateImage =(imageId,xpos,ypos,width,height) =>({
    type:UPDATE_IMAGE,
    imageId,
    xpos,
    ypos,
    width,
    height
});


export const SAVE_IMAGES_REQUEST = 'SAVE_IMAGES_REQUEST';
export const saveImagesRequest =(imageId,xpos,ypos,width,height) =>({
    type:SAVE_IMAGES_REQUEST,
    imageId,
    xpos,
    ypos,
    width,
    height
});




