import * as types from './images';

describe('fetch images request', () => {
    const action = types.fetchImagesRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.FETCH_IMAGES_REQUEST);
    });
});

describe('fetch images success', () => {
    const files ={};
    const success='Success!';
    const action = types.fetchImagesSuccess(files,success);
    it('Should return the action', () => {
        expect(action.type).toEqual(types.FETCH_IMAGES_SUCCESS);
        expect(action.success)
    });
});

describe('fetch images error', () => {
    const error = 'An Error';
    const action = types.fetchImagesError(error);
    it('Should return the action', () => {   
        expect(action.error).toEqual(error);
        expect(action.type).toEqual(types.FETCH_IMAGES_ERROR);
    });
});


describe('save images request', () => {
    const action = types.saveImagesRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.SAVE_IMAGES_REQUEST);
    });
});

describe('save images success', () => {
    const action = types.saveImagesSuccess();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.SAVE_IMAGES_SUCCESS);
    });
});


describe('delete images request', () => {
    const action = types.deleteImageRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.DELETE_IMAGE_REQUEST);
    });
});

describe('delete images success', () => {
    const action = types.deleteImageSuccess();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.DELETE_IMAGE_SUCCESS);
    });
});


describe('ondrop images request', () => {
    const action = types.onDropRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.ON_DROP_REQUEST);
    });
});
