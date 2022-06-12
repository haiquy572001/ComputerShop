export const initialAuthState = {
  token: "",
  refresh_token: "",
};

export const authTypes = {
  SET_AUTH: "SET_AUTH",
};

const authReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case authTypes.SET_AUTH:
      return {
        ...state,
        token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };

    default:
      return state;
  }
};

export default authReducer;
