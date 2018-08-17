import {
    FETCH_MOODBOARDS_SUCCESS,
    FETCH_MOODBOARDS_REQUEST,
    MOODBOARD_ACTION_ERROR,
    CLEAR_MOODBOARDS,
    SET_MOODBOARD_ID,
    DELETE_MOODBOARD_SUCCESS
} from '../actions/moodboards';

const initialState = {
    data: {},
    board_id:null,
    error: null,
    loading:null,
    boardIds:[]
};

export function moodboardReducer(state = initialState, action) {
    if(action.type === FETCH_MOODBOARDS_REQUEST){
        //console.log('FETCH MOODBOARdS REQUEST')
        return Object.assign({}, state, {
            loading:true
        });
    }
    
    else if (action.type === FETCH_MOODBOARDS_SUCCESS) {
        //console.log('FETCH MOODBOARDS SUCCESS ACTION',action.data)
        const normalizedBoards = 
        action.data.reduce((accumulator, current) => {
         accumulator[current.id] = current;
         return accumulator
       }, {});
       //return an array of the keys
      const keyArray = Object.keys(normalizedBoards);
        return Object.assign({}, state, {
            data: normalizedBoards,
            boardIds:keyArray,
            error: null,
            loading:false
        });
    } else if (action.type === MOODBOARD_ACTION_ERROR) {
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
       // console.log('SETTING BOARD ID',action);
        return Object.assign({},state, {
            board_id:action.board_id,
            error:action.error
        })
    } else if(action.type === CLEAR_MOODBOARDS){
       // console.log('CLEARING MOODBOARDS');
        return Object.assign({}, state, {
          data:{},
          boardIds:[]
      })
    }
  

    return state;
}
