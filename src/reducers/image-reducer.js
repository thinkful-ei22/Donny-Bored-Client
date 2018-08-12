'use strict';
import * as types from '../actions/images';


const initialState = {
  files: [] ,
  moodboard:null,
  loading: false,
  editMode:null,
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
          loading: true
        
        });

      case(types.SAVE_IMAGES_SUCCESS):
      return Object.assign({}, state, {
        loading: false,
        updatedImageIds:[]
      
      });

      case(types.DELETE_IMAGE_REQUEST):
      return Object.assign({}, state, {
        loading: true
      });

      case(types.DELETE_IMAGE_SUCCESS):
        // let filterIds=[];
        // if(state.updatedImageIds.includes(action.imageId)){
        //   filterIds = state.updatedImageIds.filter(id => id != action.imagId)
        
        // }
        return Object.assign({}, state, {
          loading: false,
          updatedImageIds : state.updatedImageIds.filter(id => id != action.imageId)
        
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

      case(types.EDIT_IMAGE_MODE):
      return Object.assign({},state,{
        editMode:action.mode
        
      });

      case(types.UPDATE_IMAGE):
      //const newState = { ...state };
      //return console.log('THE STATE', newState.moodboardImages)
        console.log('ACTION',action);
          let id = action.imageId;
          let newPos=[action.xpos,action.ypos];
          let newSize=[action.width,action.height];
          let updateIds=null;
        
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

            if(!state.updatedImageIds.includes(id)){
              updateIds = [...state.updatedImageIds,id]
              
            } else {
              updateIds = [...state.updatedImageIds]

            }

            return Object.assign({},state,{
              allImages: { 
                    ...state.allImages,
                        [id]: {
                         ...state.allImages[id],
                            position: newPos,
                            dimensions: newSize
                      }
                  },
              updatedImageIds: updateIds
             
        });
          
        //  console.log('UPDATING STATE',updateObj===state);
       
    default:
      return state;
    }
  };





