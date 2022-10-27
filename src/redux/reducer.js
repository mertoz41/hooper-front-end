const initialState = {
  currentUser: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_CURRENT_USER":
      return { ...state, currentUser: action.currentUser };
    case "LOG_USER_OUT":
      return { ...initialState };
    default:
      return state;
  }
}

export default reducer;
