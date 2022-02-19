import { RESET_QUERY, UPDATE_QUERY } from "../actions/queryActions";

const initialState = {
  category: "",
  brand: "",
  price: "",
  color: "",
  size: ""
};

export const queryReducer = (state = initialState, {type, payload}) => {
  
  console.log("payload from reducer ==> ", payload)
  switch (type) {
    case UPDATE_QUERY:
      return{
        ...state,
        [payload.field]: payload.value
      }
    case RESET_QUERY:
      return{
        ...initialState
      }

    default:
      return state;
  }

}

// export default queryReducer;