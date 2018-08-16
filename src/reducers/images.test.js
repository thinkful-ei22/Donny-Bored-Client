import {imagesReducer} from './image-reducer.js';
import {initialImages, initialIds} from '../components/home/homepagedata';
import * as types from '../actions/images';

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

   



});