//test moodboards actions

import * as types from './moodboards';

describe('fetch moodboards request', () => {
    const action = types.fetchMoodboardsRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.FETCH_MOODBOARDS_REQUEST);
    });
});


describe('create moodboard request', () => {
    const action = types.createMoodboardRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.CREATE_MOODBOARD_REQUEST);
    });
});

describe('edit moodboard request', () => {
    const action = types.editMoodboardRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.EDIT_MOODBOARD_REQUEST);
    });
});


describe('delete moodboard request', () => {
    const action = types.deleteMoodboardRequest();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.DELETE_MOODBOARD_REQUEST);
    });
});

describe('clear moodboards', () => {
    const action = types.clearMoodboards();
    it('Should return the action', () => {
        expect(action.type).toEqual(types.CLEAR_MOODBOARDS);
    });
});

describe('moodboard action error', () => {
    const error = "Something wrong!"
    const action = types.moodboardActionError(error);
    it('Should return the action', () => {
        expect(action.type).toEqual(types.MOODBOARD_ACTION_ERROR);
        expect(action.error).toEqual(error);
    });
});