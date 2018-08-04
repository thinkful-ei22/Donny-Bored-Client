'use strict';
import * as types from '../actions/images';

const initialState = {
  files: [] ,
  moodboard:null,
  moodboardImages : [],
  loading: false,
  error:null
};
  

export const moodboardReducer = (state=initialState, action) => {
    // switch (action.type) {
    // case(types.FETCH_MOODBOARD_REQUEST):
    //   return Object.assign({}, state, {
    //     loading: true
    //   });
    // case(types.FETCH_MOODBOARD_SUCCESS):
    //   return Object.assign({}, state, {
    //     loading: false,
    //     error: null,
    //     moodboard: action.moodboard
    //   });
    // case(types.FETCH_MOODBOARD_ERROR):
    //   return Object.assign({}, state, {
    //     loading: false,
    //     error: action.error
    //   });
    // default:
    //   return state;
    // }
  };


//Actions for getting images

export const imagesReducer = (state=initialState, action) => {
    switch (action.type) {
    case(types.FETCH_IMAGES_REQUEST):
      return Object.assign({}, state, {
        loading: true
      });
    case(types.FETCH_IMAGES_SUCCESS):
      return Object.assign({}, state, {
        moodboardImages : action.moodboardImages[0].images
      });
    case(types.FETCH_IMAGES_ERROR):
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
    }
  };


  //Actions for updating an individual image

  export const imageReducer = (state=initialState,action) => {
  
    





  };