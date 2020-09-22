const initialState = {



}


function reducer(state = initialState, action){
    switch(action.type){
        case "LOG_USER_IN":
            return {};
        default:
            return state
    }
}

export default reducer