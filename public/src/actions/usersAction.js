import axios from 'axios'
import * as types from './actionTypes'
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

// token
export function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}`,
    headers: {
      'x-access-token': tokenFromStorage
    }
  });

  return {
    type: types.ME_FROM_TOKEN,
    payload: request
  };
}
export function meFromTokenSuccess(currentUser) {
  return {
    type: types.ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}
export function meFromTokenFailure(error) {
  return {
    type: types.ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

//SIGNUP
export function signUpUser(formValues) {
  const request = axios.post(`${ROOT_URL}/users/signup`, formValues);

  return {
    type: types.SIGNUP_USER,
    payload: request
  };
}
export function signUpUserSuccess(user) {
  return {
    type: types.SIGNUP_USER_SUCCESS,
    payload: user
  };
}
export function signUpUserFailure(error) {
  return {
    type: types.SIGNUP_USER_FAILURE,
    payload: error
  };
}
export function resetUser() {
  return {
    type: types.RESET_USER,
  };
}

//SIGNIN
export function signInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/users/signin`, formValues);

  return {
    type: types.SIGNIN_USER,
    payload: request
  };
}
export function signInUserSuccess(user) {
  return {
    type: types.SIGNIN_USER_SUCCESS,
    payload: user
  };
}
export function signInUserFailure(error) {
  return {
    type: types.SIGNIN_USER_FAILURE,
    payload: error
  };
}

//SIGNOUT
export function resetToken() {//used for logout
  return {
    type: types.RESET_TOKEN
  };
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER
  };
}