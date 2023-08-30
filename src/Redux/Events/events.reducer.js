import * as eventsActions from './events.actions';
export const eventFeatureKey = 'events';

let initialState = {
    loading: false,
    events: [],
    errorMessage: ''
}

export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case eventsActions.UPLOAD_EVENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case eventsActions.UPLOAD_EVENT_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case eventsActions.UPLOAD_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }
        case eventsActions.GET_FREE_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case eventsActions.GET_FREE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: payload.events
            }
        case eventsActions.GET_FREE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }
        case eventsActions.GET_PRO_EVENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case eventsActions.GET_PRO_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                events: payload.events
            }
        case eventsActions.GET_PRO_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }
        default: return state;
    }
}