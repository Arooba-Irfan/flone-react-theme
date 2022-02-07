import { actionTypes } from "../common/actionTypes";

const initialState = {
  user: {},
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN:
      console.log("LOGIN REDUCER", payload.response.data);
      return {
        ...state,
        user: {
          ...payload.response.data,
        },
      };

    case actionTypes.REGISTER:
      console.log("REGISTER REDUCER", payload.response.data);
      return {
        ...state,
        user: {
          ...payload.response.data,
        },
      };

    default:
      return state;
  }
};
