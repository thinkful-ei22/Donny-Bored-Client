'use strict';
import * as types from '../actions/images';


const initialState = {
  files: [] ,
  moodboard:null,
  loading: false,
  error:null,
  allImages:{},
  imageIds:[],
  
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
         // moodboardImages : action.moodboardImages[0].images,
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



      case(types.UPDATE_IMAGE):
      //const newState = { ...state };
      //return console.log('THE STATE', newState.moodboardImages)
        console.log('ACTION',action);
          let id = action.imageId;
          let newPos=[action.xpos,action.ypos];
          let newSize=[action.width,action.height];
              const updateObj = {
                ...state, 
                  allImages: { 
                      ...state.allImages,
                    [id]: {
                        ...state.allImages[id],
                      position: newPos,
                      dimensions: newSize
                    }
                }    
            }

          
         // let myImages = state;


         //myImages.allImages[id].position=newPos;
         //myImages.allImages[id].dimensions=newSize;

          console.log('UPDATING STATE',updateObj===state);
          return  updateObj;
    default:
      return state;
    }
  };

  
//Action for getting an image from the Redux Store
function imageUpdateReducer(imageId){
  const match = initialState.allImages[imageId];
  return match;
}




  //Actions for updating an individual image

  // export const imageUpdateReducer = (state=initialState,action) => {
  //    // const imageArray = action.moodboardImages[0].images;
  //       const imageArray = state.moodBoardimages;
  //       return imageArray.map( (image) => {
  //           console.log('ACTION',action)
  //           if(image.id !== action.id) {
  //               // This isn't the item we care about - keep it as-is
  //               return image;
  //           }
  //           // Otherwise, this is the one we want - return an updated value
  //           return {
  //               ...image,
  //               ...action
  //           };    
  //       });

  // };

