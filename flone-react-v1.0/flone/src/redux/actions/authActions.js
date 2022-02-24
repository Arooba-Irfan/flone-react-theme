import axios from "axios";
import { actionTypes } from "../common/actionTypes";
const SERVER_URL = "https://brand-bucket.herokuapp.com";

export const login = (body, navigate, addToast) => async (dispatch) => {
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
    if (addToast) {
      addToast("SignedUp Successfully", { appearance: "success", autoDismiss: true });
    }
    navigate();
  } catch (error) {
    console.log("error", error.message);
  }
  return response;
};

export const register = (body, navigate, addToast) => async (dispatch) => {
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
      if (addToast) {
        addToast("SignedUp Successfully", { appearance: "success", autoDismiss: true });
      }
      navigate();
    } catch (error) {
      if (addToast) {
        addToast("Already Exist", { appearance: "warning", autoDismiss: true });
      }
        console.log("error", error.response.data.message);
    }
    return response;
  };

export const logout = (addToast) => async (dispatch) => {
  console.log("in acion logout")
  try {
    dispatch({
      type: actionTypes.LOGOUT
    })
    if (addToast) {
      addToast("LogOut Successfully", { appearance: "success", autoDismiss: true });
    }
  } catch (error) {
    console.log(error)
  }
}
  