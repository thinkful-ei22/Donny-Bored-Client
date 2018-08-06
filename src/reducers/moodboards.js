import {
    FETCH_MOODBOARDS_SUCCESS,
    FETCH_MOODBOARDS_ERROR
} from '../actions';

const initialState = {
    data: [],
    error: null
};

export function moodboardReducer(state = initialState, action) {
    if (action.type === FETCH_MOODBOARDS_SUCCESS) {
        console.log('FETCH MOODBOARDS SUCCESS ACTION',action.data)
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_MOODBOARDS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}
