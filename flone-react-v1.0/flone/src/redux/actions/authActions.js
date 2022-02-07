import axios from "axios";
import { actionTypes } from "../common/actionTypes";
const SERVER_URL = "http://localhost:8000";

export const login = (body, navigate) => async (dispatch) => {
  console.log("LOGIN BODY", body);
  let response;
  try {
    response = await axios.post(SERVER_URL + "/api/auth/login", body);
    console.log("LOGIN RESPONSE", response);
    dispatch({
      type: actionTypes.LOGIN,
      payload: {
        response
      },
    });
    navigate();
  } catch (error) {
    console.log("error", error.message);
  }
  return response;
};

export const register = (body, navigate) => async (dispatch) => {
    console.log("REGISTER BODY", body);
    let response;
    try {
      response = await axios.post(SERVER_URL + "/api/auth/signup", body);
      console.log("REGISTER RESPONSE", response);
      dispatch({
        type: actionTypes.REGISTER,
        payload: {
          response
        },
      });
      navigate();
    } catch (error) {
      console.log("error", error.message);
    }
    return response;
  };
  