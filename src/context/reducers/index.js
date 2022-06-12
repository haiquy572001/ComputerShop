export const initialState = {
  auth: {
    token: "",
    refresh_token: "",
  },
};

export const actionTypes = {
  SET_AUTH: "SET_AUTH",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {
        ...state,
        auth: {
          token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
        },
      };

    default:
      return state;
  }
};

export default reducer;
