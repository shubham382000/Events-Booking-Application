import Axios from "axios";
import * as alertActions from '../Alerts/alerts.actions';
import * as userUtil from '../../Components/Root/Util/UserUtil';
import * as tokenUtil from '../../Components/Root/Util/TokenUtil'

export const UPLOAD_EVENT_REQUEST = 'UPLOAD_EVENT_REQUEST';
export const UPLOAD_EVENT_SUCCESS = 'UPLOAD_EVENT_SUCCESS';
export const UPLOAD_EVENT_FAILURE = 'UPLOAD_EVENT_FAILURE';

export const GET_FREE_EVENT_REQUEST = 'GET_FREE_EVENT_REQUEST';
export const GET_FREE_EVENT_SUCCESS = 'GET_FREE_EVENT_SUCCESS';
export const GET_FREE_EVENT_FAILURE = 'GET_FREE_EVENT_FAILURE';

export const GET_PRO_EVENT_REQUEST = 'GET_PRO_EVENT_REQUEST';
export const GET_PRO_EVENT_SUCCESS = 'GET_PRO_EVENT_SUCCESS';
export const GET_PRO_EVENT_FAILURE = 'GET_PRO_EVENT_FAILURE';

export const uploadEvent = (event, history) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPLOAD_EVENT_REQUEST });
            let dataURL = 'http://127.0.0.1:5000/api/events/upload'
            let response = await Axios.post(dataURL, event);
            dispatch({ type: UPLOAD_EVENT_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert(response.data.msg, 'success'));
            if (event.type === 'Free') {
                history('/events/free');
            }
            if (event.type === 'Pro') {
                history('/events/pro');
            }

        }
        catch (error) {
            dispatch({ type: UPLOAD_EVENT_FAILURE, payload: error.message });
        }
    }
}

// get free event 

export const GetFreeEvent = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_FREE_EVENT_REQUEST });
            let dataURL = 'http://127.0.0.1:5000/api/events/free'
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_FREE_EVENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_FREE_EVENT_FAILURE, payload: error.message });
        }
    }
}

// get pro event 

export const GetProEvent = () => {
    return async (dispatch) => {
        try {
            if (userUtil.getToken()) {
                tokenUtil.setAuthToken(userUtil.getToken());
            }
            dispatch({ type: GET_PRO_EVENT_REQUEST });
            let dataURL = 'http://127.0.0.1:5000/api/events/pro'
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_PRO_EVENT_SUCCESS, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_PRO_EVENT_FAILURE, payload: error.message });
        }
    }
}
