import Axios from "axios";
import * as alertActions from '../Alerts/alerts.actions';
import * as userUtil from '../../Components/Root/Util/UserUtil';
import * as tokenUtil from '../../Components/Root/Util/TokenUtil';

export const REGISTER_USERS_REQUEST = 'REGISTER_USERS_REQUEST';
export const REGISTER_USERS_SUCCESS = 'REGISTER_USERS_SUCCESS';
export const REGISTER_USERS_FAILURE = 'REGISTER_USERS_FAILURE';

export const LOGIN_USERS_REQUEST = 'LOGIN_USERS_REQUEST';
export const LOGIN_USERS_SUCCESS = 'LOGIN_USERS_SUCCESS';
export const LOGIN_USERS_FAILURE = 'LOGIN_USERS_FAILURE';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';


export const LOGOUT_USERS = 'LOGOUT_USERS';

export const registerUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({ type: REGISTER_USERS_REQUEST });
            let dataURL = 'http://127.0.0.1:5000/api/users/register';
            let response = await Axios.post(dataURL, user);
            dispatch({ type: REGISTER_USERS_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert(response.data.msg, 'success'));
            history('/users/login');
        }
        catch (error) {
            dispatch({ type: REGISTER_USERS_FAILURE, payload: error });
            let errorList = error.response.data.errors;
            for (let error of errorList) {
                dispatch(alertActions.setAlert(error.msg, 'danger'));
            }

        }
    }
}

// login user 

export const LoginUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_USERS_REQUEST });
            let dataURL = 'http://127.0.0.1:5000/api/users/login';
            let response = await Axios.post(dataURL, user);
            dispatch({ type: LOGIN_USERS_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert(response.data.msg, 'success'));
            history('/');
        }
        catch (error) {
            dispatch({ type: LOGIN_USERS_FAILURE, payload: error.response.data });
            let errorList = error.response.data.errors; 
            for (let error of errorList){
            dispatch(alertActions.setAlert(error.msg, 'danger'));
            }
        }
    }
}

// logout user 

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USERS })
    }
}

// get user info 

export const getUserInfo = () => {
    if (userUtil.getToken()) {
        tokenUtil.setAuthToken(userUtil.getToken());
    }
    return async (dispatch) => {
        try {
            dispatch({ type: GET_USER_INFO_REQUEST });
            let dataURL = 'http://127.0.0.1:5000/api/users';
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data })
        }
        catch (error) {
            dispatch({ type: GET_USER_INFO_FAILURE, payload: error })
        }
    }
}