const initialState = {
    currentUser: null,
    allUsers: [],
    searchedUser: null,
    feedbacks: [],
    apiLocations: [],
    currentLocation:{
        lat: null,
        lng: null
    },
    selectedLocation: null
}


function reducer(state = initialState, action){
    switch(action.type){
        case "LOG_USER_IN":
            return {...state, currentUser: action.currentUser};
        case "ALL_USERS_INCOMING":
            return {...state, allUsers: action.allUsers};
        case "SEARCHED_USER":
            return {...state, searchedUser: action.searchedUser};
        case "SEARCHED_USER_FEEDBACKS":
            return {...state, feedbacks: action.feedbacks};
        case "CLEAR_SEARCHED_USER":
            return {...state, feedbacks: [], searchedUser: null};
        case "LOG_USER_OUT":
            return {...state, currentUser: null, searchedUser: null, feedbacks: [], apiLocations: [], currentLocation: {lat: null,lng: null}};
        case "API_LOCATIONS_INCOMING":
            return {...state, apiLocations: action.apiLocations};
        case "SHARED_LOCATION":
            return {...state, currentLocation: action.currentLocation};
        case "ADD_COMMENT_ON_LOCATION":
            return {...state, apiLocations: action.apiLocations};
        case "ADD_NEW_FEEDBACK":
            return {...state, feedbacks: action.feedbacks};
        case "SELECTED_LOCATION_INCOMING":
            return {...state, selectedLocation: action.selectedLocation};
        default:
            return state
    }
}

export default reducer