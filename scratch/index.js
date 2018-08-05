

'use strict';

const testStore = {
  allImages : {
    621 : {
      id : 621,
      'imageurl': 'http://res.cloudinary.com/moodimagescloud/image/upload/v1533299149/umbhio4uwtidf3gmtxqf.gif',
      'position': [
        500,
        500
      ],
      'dimensions': [
        350,
        267
      ]
    },
    622: {
      'id': 622,
      'imageurl': 'http://res.cloudinary.com/moodimagescloud/image/upload/v1533299161/lqy284bsshaszrgs41jg.jpg',
      'position': [
        500,
        500
      ],
      'dimensions': [
        900,
        769
      ]
    },
 
    imageIds :[
      '621',
      '622'
    ]

  }
};


const updateObj = {

  id: 626,
  imageurl: 'http://res.cloudinary.com/moodimagescloud/image/upload/v1533299381/atey1ffsbsj2vtwdfp2x.gif',
  position: [
    500,
    500
  ],
  dimensions: [
    337,
    96
  ]
    
};


// function newFunction(imageId){
//    let id = 621;
//    let newPosX =200;
//    let newPosY=500;

//    const newObj = {
//         ...testStore, 
//           allImages: { 
//               ...testStore.allImages,
//             [id]: {
//                 ...testStore.allImages[id],
//                position: testStore.allImages[id].position.map(item => item === 500 ? 6 : item),
//                dimensions: testStore.allImages[id].dimensions.map(item => item === 350 ? 6 : item)
//             }
//         }    
//     }
//     console.log(newObj.allImages['621']);
// }

  
function newFunction(imageId){
    let id = 621;
    let posX=666;
    let posY=777;
    let sizeY=480;
    let sizeX=640;
 
    const newObj = {
         ...testStore, 
           allImages: { 
               ...testStore.allImages,
             [id]: {
                 ...testStore.allImages[id],
                position: [posX,posY],
                dimensions: [sizeX,sizeY]
             }
         }    
     }
     console.log(newObj === testStore );
     console.log(newObj, testStore);
 }
 
   


newFunction();
