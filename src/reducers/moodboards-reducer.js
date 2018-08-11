import {
    FETCH_MOODBOARDS_SUCCESS,
    FETCH_MOODBOARDS_REQUEST,
    FETCH_MOODBOARDS_ERROR,
    SET_MOODBOARD_ID,
    DELETE_MOODBOARD_SUCCESS
} from '../actions/moodboards';

const initialState = {
    data: [],
    board_id:null,
    error: null,
    loading:null
};

export function moodboardReducer(state = initialState, action) {
    if(action.type === FETCH_MOODBOARDS_REQUEST){
        console.log('FETCH MOODBOARdS REQUEST')
        return Object.assign({}, state, {
            loading:true
        });
    }
    
    else if (action.type === FETCH_MOODBOARDS_SUCCESS) {
        console.log('FETCH MOODBOARDS SUCCESS ACTION',action.data)
        return Object.assign({}, state, {
            data: action.data,
            error: null,
            loading:false
        });
    } else if (action.type === FETCH_MOODBOARDS_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading:false,
        });

    } else if (action.type === DELETE_MOODBOARD_SUCCESS){
        return Object.assign({}, state, {
            data: action.data,
            error: action.error
        });
    }else if(action.type === SET_MOODBOARD_ID){
        console.log('SETTING BOARD ID',action);
        return Object.assign({},state, {
            board_id:action.board_id,
            error:action.error
        })
    }



    return state;
}
