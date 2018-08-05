'use strict';
import * as types from '../actions/images';


const initialState = {
  files: [] ,
  moodboard:null,
  moodboardImages : [],
  loading: false,
  error:null,
  allImages:{},
  imageIds:[]
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


//normalize image data
//with recursion
//without recursion
function normalize(data) {
    "use strict";
    var ret = {};
    data.forEach(function (item, idx) {
      if(item.id) {
        ret[item.id] = pluck(item); 
      }
    });
    return ret;
  }
  
  function pluck(obj, propX) {
    "use strict";
    var ret = {};
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        if(prop === propX) { continue; }
        ret[prop] = obj[prop];
      }
    }
    return ret;
  }
  
  

  

//Action for getting an image from the Redux Store
function imageUpdateReducer(imageId){
    const match = initialState.allImages[imageId];
    return match;
  }



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
     normalizedImages.imageIds = keyArray;


     console.log('keys', keyArray);
    console.log('NORMALIZED', normalizedImages);
      return Object.assign({}, state, {
        moodboardImages : action.moodboardImages[0].images,
        allImages : normalizedImages
      });

    case(types.FETCH_IMAGES_ERROR):
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });


    case(types.UPDATE_IMAGE):
    //const newState = { ...state };
     //return console.log('THE STATE', newState.moodboardImages);

     console.log('ACTION',action);
         let id = action.imageId;
         let newPos=[action.xPos,action.yPos];
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

          console.log('UPDATING STATE',updateObj);
          return Object.assign({}, state, {

            allImages: updateObj.allImages

          });


    default:
      return state;
    }
  };


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

  //function updateObjectInArray(array, action) {
//     return array.map( (item, index) => {
//         if(index !== action.index) {
//             // This isn't the item we care about - keep it as-is
//             return item;
//         }
// ​
//         // Otherwise, this is the one we want - return an updated value
//         return {
//             ...item,
//             ...action.item
//         };    
//     });
// }