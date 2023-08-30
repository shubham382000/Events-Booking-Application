import * as userActions from '../Users/users.actions'

export const usersFeatureKey = 'users';

let initialState =
{
    loading: false,
    errorMessage: '',
    token: '',
    user: {},
    isAuthenticated: false
}


export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case userActions.REGISTER_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.REGISTER_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case userActions.REGISTER_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }
        case userActions.LOGIN_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.LOGIN_USERS_SUCCESS:
            localStorage.setItem('events-token', payload.token)
            return {
                ...state,
                loading: false,
                token: payload.token,
                user: payload.user,    
                isAuthenticated: true
            }               
        case userActions.LOGIN_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload,
                token: '',
                user: {},
                isAuthenticated: false
            }
        case userActions.LOGOUT_USERS:
            localStorage.removeItem('events-token')
            return {
                token: '',
                user: {},
                isAuthenticated: false
            }
        case userActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false, 
                user : payload.user
            }
        case userActions.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                user : {}
            }
        default: return state;
    }
}