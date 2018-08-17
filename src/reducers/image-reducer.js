
import * as types from '../actions/images';
import {initialImages, initialIds} from '../components/home/homepagedata';


//680x510

const initialState = {
  files: [] ,
  moodboard:null,
  loading: false,
  editMode:false,
  error:null,
  success:null,
  allImages:initialImages,
  imageIds:initialIds,
  updatedImageIds:[]
  
};



//Actions for getting images from API

export const imagesReducer = (state=initialState, action) => {
    switch (action.type) {
    case(types.LOAD_HOMEPAGE):
      return Object.assign({}, state, {
        allImages: initialImages,
        imageIds:initialIds
      });
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
        success:action.success,
        loading: false
      });
    
      case(types.FETCH_IMAGES_ERROR):
      return Object.assign({}, state, {
        loading: false,
        success:null,
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
        return Object.assign({}, state, {
          loading: false,
          updatedImageIds : state.updatedImageIds.filter(id => id !== action.imageId)
        
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
        editMode:!state.editMode
        
      });

      case(types.UPDATE_IMAGE):
      //const newState = { ...state };
      //return console.log('THE STATE', newState.moodboardImages)
        console.log('ACTION',action);
          let id = action.imageId;
          let newPos=[action.xpos,action.ypos];
          let newSize=[action.width,action.height,action.rotateAngle];
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





