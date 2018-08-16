import * as types from './images';

describe('fetch images request', () => {
    const action = types.fetchImagesRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.FETCH_IMAGES_REQUEST);
    });
});


describe('save images request', () => {
    const action = types.saveImagesRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.SAVE_IMAGES_REQUEST);
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
