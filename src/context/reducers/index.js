export const initialState = {
  loading: false,
  auth: {
    token: "",
    refresh_token: "",
  },
  cart: {
    count: 0,
    data: [],
  },
  order: {
    count: 0,
    data: [],
  },
  profile: {},
};

export const actionTypes = {
  SET_AUTH: "SET_AUTH",
  REMOVE_AUTH: "REMOVE_AUTH",
  LOADING: "LOADING",
  SET_PROFILE: "SET_PROFILE",
  GET_LIST_CART: "GET_LIST_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_TO_CART: "REMOVE_TO_CART",
  REMOVE_ALL_CART: "REMOVE_ALL_CART",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH:
      return {
        ...state,
        auth: {
          token: action.payload.access,
          refresh_token: action.payload.refresh,
        },
      };
    case actionTypes.REMOVE_AUTH:
      return {
        ...state,
        auth: {
          token: "",
          refresh_token: "",
        },
        cart: {
          count: 0,
          data: [],
        },
        order: {
          count: 0,
          data: [],
        },
        profile: {},
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    // CART
    case actionTypes.GET_LIST_CART:
      return {
        ...state,
        cart: {
          count: action.payload.length,
          data: action.payload,
        },
      };
    case actionTypes.ADD_TO_CART:
      const idx = state.cart.data.findIndex((c) => c.id === action.payload.id);
      if (idx > -1) {
        return state;
        // const newData = [...state.cart.data];
        // Object.assign(newData[idx], {
        //   number_product: newData[idx].number_product + 1,
        // });
        // return {
        //   ...state,
        //   cart: {
        //     data: newData,
        //   },
        // };
      } else {
        // console.log(3333333333);
        return {
          ...state,
          cart: {
            count: state.cart.count + 1,
            data: [action.payload, ...state.cart.data],
          },
        };
      }

    case actionTypes.REMOVE_TO_CART:
      return {
        ...state,
        cart: {
          count: state.cart.count - 1,
          data: state.cart.data.filter(
            (item, index) => index !== action.payload
          ),
        },
      };
    case actionTypes.REMOVE_ALL_CART:
      return {
        ...state,
        cart: {
          count: 0,
          data: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
