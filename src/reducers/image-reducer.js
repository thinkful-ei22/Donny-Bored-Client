'use strict';
import * as types from '../actions/images';


const initialState = {
  files: [] ,
  moodboard:null,
  loading: false,
  error:null,
  allImages:{},
  imageIds:[],
  updatedImageIds:[]
  
};
  
//Actions for getting images from API

export const imagesReducer = (state=initialState, action) => {
    switch (action.type) {
    
    case(types.FETCH_IMAGES_REQUEST):
      return Object.assign({}, state, {
        loading: true
      });

    case(types.FETCH_IMAGES_SUCCESS):
    //get array of objects - use reduce to noramlize data and return an object with the key being the id and then the object as a property
        const normalizedImages = 
           action.moodboardImages[0].images.reduce((accumulator, current) => {
            accumulator[current.id] = current;
            return accumulator
          }, {});
          //return an array of the keys
         const keyArray = Object.keys(normalizedImages);
          //add the key array to the object
          //normalizedImages.imageIds = keyArray;
          console.log('keys', keyArray);
          console.log('NORMALIZED', normalizedImages);
      return Object.assign({}, state, {
        allImages : normalizedImages,
        imageIds: keyArray,
        loading: false
      });
    
      case(types.FETCH_IMAGES_ERROR):
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

        //saves images/image positions to server side
      case(types.SAVE_IMAGES_REQUEST):
        return Object.assign({}, state, {
          loading: false,
          error: action.error
        });

      case(types.CLEAR_IMAGES):
       console.log('CLEARING IMAGES');
        return Object.assign({}, state, {
          allImages:{},
          imageIds:[]          
        });

      case(types.CLEAR_UPDATED_IMAGES):
      console.log('CLEARING UPDATED IMAGES');
      return Object.assign({},state,{
        updatedImageIds:[]
      });

      case(types.UPDATE_IMAGE):
      //const newState = { ...state };
      //return console.log('THE STATE', newState.moodboardImages)
        console.log('ACTION',action);
          let id = action.imageId;
          let newPos=[action.xpos,action.ypos];
          let newSize=[action.width,action.height];
            //   const updateObj = {
            //     ...state, 
            //       allImages: { 
            //           ...state.allImages,
            //         [id]: {
            //             ...state.allImages[id],
            //           position: newPos,
            //           dimensions: newSize
            //         }
            //     }    
            // }
           
        //  console.log('UPDATING STATE',updateObj===state);
          return Object.assign({},state,{
                allImages: { 
                      ...state.allImages,
                          [id]: {
                           ...state.allImages[id],
                              position: newPos,
                              dimensions: newSize
                        }
                    },
                updatedImageIds: [...state.updatedImageIds,id]
               
          });
    default:
      return state;
    }
  };





