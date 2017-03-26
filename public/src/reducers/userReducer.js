import * as types from '../actions/actionTypes'
import { 
    meFromToken,meFromTokenSuccess,meFromTokenFailure,
    signUpUser,signInUserSuccess,signUpUserFailure,
    signInUser,signInUserSuccess,signInUserFailure,
    logoutUser,resetToken
 } from '../actions/usersAction'
const INITIAL_STATE = {user: null, status:null, error:null, loading: false};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case types.ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
    return { ...state, user: null, status:'storage', error:null, loading: true}; 
    case types.ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case types.ME_FROM_TOKEN_FAILURE:// return error and make loading = false
     error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors   
    return { ...state, user: null, status:'storage', error:error, loading: false};
    case types.RESET_TOKEN:// remove token from storage make loading = false
    return { ...state, user: null, status:'storage', error:null, loading: false};

    case types.SIGNUP_USER:// sign up user, set loading = true and status = signup
    return { ...state, user: null, status:'signup', error:null, loading: true}; 
    case types.SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case types.SIGNUP_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'signup', error:error, loading: false};


    case types.SIGNIN_USER:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'signin', error:null, loading: true}; 
    case types.SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.user, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case types.SIGNIN_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors      
    return { ...state, user: null, status:'signin', error:error, loading: false};
    

    case types.LOGOUT_USER:
      return {...state, user:null, status:'logout', error:null, loading: false};

    case types.RESET_USER:// reset authenticated user to initial state
    return { ...state, user: null, status:null, error:null, loading: false};
    
    default:
    return state;
  }
}