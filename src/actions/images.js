import { API_BASE_URL } from '../config';
import {normalizeResponseErrors} from './utils';


//GET IMAGE RELATED ACTIONS
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const fetchImagesRequest = () => ({
    type: FETCH_IMAGES_REQUEST
});

export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const fetchImagesSuccess = (moodboardImages, success) =>({
    
    type:FETCH_IMAGES_SUCCESS,
    moodboardImages:moodboardImages,
    success
});

//{console.log('SUCCESSS!!',moodboardImages)};

export const FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR';
export const fetchImagesError = error => ({
    type: FETCH_IMAGES_ERROR,
    error
});


export const FETCH_IMAGES = 'FETCH_IMAGES';
export const fetchImages = (boardId) => (dispatch, getState)=> {
    //console.log('FETCHING...');
    const authToken = getState().auth.authToken;
    dispatch(fetchImagesRequest());
 
    return fetch(`${API_BASE_URL}/api/moodboards/${boardId}`, {
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


//UPDATE IMAGE LOCATION AND SIZE IN REDUX STORE


export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const updateImage =(imageId,xpos,ypos,width,height,rotateAngle) =>({
    type:UPDATE_IMAGE,
    imageId,
    xpos,
    ypos,
    width,
    height,
    rotateAngle
});

export const UPDATE_IMAGE_SUCCESS = "UPDATE_IMAGE_SUCCESS";
export const updateImageSuccess=()=>({
    type:UPDATE_IMAGE_SUCCESS

});

//SAVE BOARD IMAGES POSITIONS TO DATABASE
export const SAVE_IMAGES_REQUEST = 'SAVE_IMAGES_REQUEST';
export const saveImagesRequest =() =>({
    type:SAVE_IMAGES_REQUEST
});

export const SAVE_IMAGES_SUCCESS = 'SAVE_IMAGES_SUCCESS';
export const saveImagesSuccess = ()=>({
    type:SAVE_IMAGES_SUCCESS
});

export const SAVE_IMAGES_ERROR = 'SAVE_IMAGES_ERROR';
export const saveImagesError = (error)=>({
    type:SAVE_IMAGES_ERROR,
    error
});


export const SAVE_IMAGES = 'SAVE_IMAGES';
export const saveImages=(imageIds,images)=>(dispatch,getState)=>{
    dispatch(saveImagesRequest());
    //console.log('saving...uploading new data to server...!!',imageIds);
    const updaters=imageIds.map(id => {
        //using fetch insead of Axios library
        console.log('SAVING IMAGES...');
       return fetch(`${API_BASE_URL}/api/images/${id}`,{
          method:'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
           body: JSON.stringify({
             position: images[id].position,
             dimensions: images[id].dimensions
  
          })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => dispatch(saveImagesSuccess()))
        .catch(err => {
            dispatch(saveImagesError(err));
        });
    });

    Promise
    .all(updaters)
    .then(() => {
      dispatch(saveImagesSuccess());
      //console.log('UPDATED MOODBOARD');
     })
     .catch(err => {
        dispatch(saveImagesError(err));
    });


}


//EDITING MODES
export const EDIT_IMAGE_MODE='EDIT_IMAGE_MODE';
export const editImageMode=()=>({
    type:EDIT_IMAGE_MODE,

})


//DELETE IMAGE

export const DELETE_IMAGE_REQUEST='DELETE_IMAGE_REQUEST';
export const deleteImageRequest=()=>({
    type:DELETE_IMAGE_REQUEST

});


export const DELETE_IMAGE_SUCCESS='DELETE_IMAGE_SUCCESS';
export const deleteImageSuccess=(imageId)=>({
    type:DELETE_IMAGE_SUCCESS,
    imageId
});


export const DELETE_IMAGE= 'DELETE_IMAGE';
export const deleteImage = (imageId,board_id) => (dispatch, getState)=> {
    dispatch(deleteImageRequest);
    //console.log('DELETING...',imageId,board_id);
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
        dispatch(deleteImageSuccess(imageId));
       
        //console.log('DELETED',res);
        //return res.json();
      })
      .then(()=>{
         dispatch(saveImages(getState().images.updatedImageIds,getState().images.allImages));
      })
      .then(() => {
         // console.log('dispatching imagees...');
         dispatch(fetchImages(board_id));
      })
      .catch(err => {
        dispatch(fetchImagesError(err));
      });
}


//ONDROP IMAGES 
export const ON_DROP_REQUEST = 'ON_DROP_REQUEST';
export const onDropRequest=()=>({
    type:ON_DROP_REQUEST
});

export const ON_DROP_SUCCESS = 'ON_DROP_SUCCESS';
export const onDropSuccess=()=>({
    type:ON_DROP_SUCCESS
});

export const ON_DROP_ERROR = 'ON_DROP_ERROR';
export const onDropError=(error)=>({
    type:ON_DROP_ERROR,
    error
})


export const onDropFiles=(files,mousePosX=640,mousePosY=640,boardId)=>(dispatch,getState)=>{
    //console.log("ON DROP FILES ACTION");
    dispatch(onDropRequest());
        //console.log('FILES',files);
        const uploaders = files.map(file => {
          // Initial FormData
          //https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
          const formData = new FormData();
          formData.append('file', file);
          formData.append('moodboard_id',boardId);
          formData.append('positionX', Math.floor(mousePosX-250));
          formData.append('positionY',Math.floor(mousePosY-250));
           //console.log("MOUSE XY",mousePosX,mousePosY);
          //Make an AJAX upload request using Axios
          //using fetch insead of Axios library
         return fetch(`${API_BASE_URL}/api/cloudinary`,{
            method:'POST',
            body:formData
          })
          .then(response => console.log(response) )
          .catch(err => {
            dispatch(fetchImagesError(err));
          });
        });

        // Once all the files are uploaded 
       return Promise
          .all(uploaders)
        //   .then(()=>{
        //     // this.props.saveUploadImages();
        //     dispatch(fetchImages(boardId))
        //   })
    
}

//CLEAR STORE IMAGE ARRAY
export const CLEAR_IMAGES = 'CLEAR_IMAGES';
export const clearImages=()=>({
    type:CLEAR_IMAGES
});

//CLEAR STORE IMAGE ARRAY
export const CLEAR_UPDATED_IMAGES = 'CLEAR_UPDATED_IMAGES';
export const clearUpdatedImages=()=>({
    type:CLEAR_UPDATED_IMAGES
});

//LOAD INITIAL IMAGES FOR HOMEPAGE
export const LOAD_HOMEPAGE = 'LOAD_HOMEPAGE';
export const loadHomepage=(mobile)=>({
    type:LOAD_HOMEPAGE,
    mobile
});



