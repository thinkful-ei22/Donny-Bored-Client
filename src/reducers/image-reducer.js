
import * as types from '../actions/images';


//these are used for the homepage upon initialization
const initialImages={
  0: {
   id:0,
   imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333531/homepage/jordan.jpg',
   position: [170,-50],
   dimensions:[93,143],

  },
  1:{
   id:1,
   imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333558/homepage/board.gif',
   position: [596,139],
   dimensions:[130,130],

  },
  2:{
    id:2,
    imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333554/homepage/puppyjack.gif',
    position:[-32,384],
    dimensions:[100,100],
  },
  3:{
    id:3,
    imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333573/homepage/fruits.png',
    position:[361,-36],
    dimensions:[200,117],
  },
  4:{
    id:4,
    imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333573/homepage/poster.png',
    position: [-60,130],
    dimensions:[120,173],
 
   },
   5:{
     id:5,
     imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333569/homepage/pcl.jpg',
     position:[560,363],
     dimensions:[130,130]
   },
   6:{
     id:6,
     imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333518/homepage/bed.png',
     position:[100,130],
     dimensions:[80,74]
   },
   7:{
    id:7,
    imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333573/homepage/angels.png',
    position: [150,357],
    dimensions:[101,104]
 
   },
   8:{
     id:8,
     imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333581/homepage/kleenex.png',
     position:[324,351],
     dimensions:[150,202]
   },
   9:{
     id:9,
     imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333556/homepage/hi.gif',
     position:[279,173],
     dimensions:[30,30]
   },
    10:{
      id:10,
      imageurl:'https://res.cloudinary.com/moodimagescloud/image/upload/v1534333624/homepage/homehappy.jpg',
      position:[510,105],
      dimensions:[30,37]
    }
}

const initialIds=[0,1,2,3,4,5,6,7,8,9,10];

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





