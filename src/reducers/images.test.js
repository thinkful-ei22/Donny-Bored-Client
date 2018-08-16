import {imagesReducer} from './image-reducer.js';
import {initialImages, initialIds} from '../components/home/homepagedata';
import * as types from '../actions/images';

const initialState={
    files: [] ,
    moodboard:null,
    loading: false,
    editMode:false,
    error:null,
    success:null,
    allImages:initialImages,
    imageIds:initialIds,
    updatedImageIds:[]
}

describe('imagesReducer', ()=>{

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = imagesReducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    it('Should set the initial state when nothing is passed in', () => {
        const state = imagesReducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
            files: [] ,
            moodboard:null,
            loading: false,
            editMode:false,
            error:null,
            success:null,
            allImages:initialImages,
            imageIds:initialIds,
            updatedImageIds:[]
            
        });
    });

    it('Should clear the current images and imageids', () => {

        const state = imagesReducer(initialState, types.clearImages());
        expect(state).toEqual({
            files: [] ,
            moodboard:null,
            loading: false,
            editMode:false,
            error:null,
            success:null,
            allImages:{},
            imageIds:[],
            updatedImageIds:[]

        })
    });

    it('Should clear the clear updated image ids', () => {

        const state = imagesReducer(initialState, types.clearUpdatedImages());
        expect(state).toEqual({
            files: [] ,
            moodboard:null,
            loading: false,
            editMode:false,
            error:null,
            success:null,
            allImages:initialImages,
            imageIds:initialIds,
            updatedImageIds:[]

        })
    });

    it('Save Images success', () => {

        const state = imagesReducer(initialState, types.saveImagesSuccess());
        expect(state).toEqual({
            files: [] ,
            moodboard:null,
            loading: false,
            editMode:false,
            error:null,
            success:null,
            allImages:initialImages,
            imageIds:initialIds,
            updatedImageIds:[]

        })
    });

    it('Should Update Image position', () => {

        let id = 0;
        let newPos=[10,10];
        let newSize=[10,10];

        const state = imagesReducer(initialState, types.updateImage(id,10,10,10,10));
        
        let updateIds = [...initialState.updatedImageIds,id]

        let updatedState = Object.assign({},state,{
            allImages: { 
                  ...initialState.allImages,
                      [id]: {
                       ...initialState.allImages[id],
                          position: newPos,
                          dimensions: newSize
                    }
                },
            updatedImageIds: updateIds
           
        });
        
        
        expect(state).toEqual(updatedState)
    });


    

});