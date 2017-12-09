import { FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESS } from '../actions/types';
const INITIAL_STATE = {
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload }
        case FACEBOOK_LOGIN_FAIL:
            return { token: null }
        default: return state;
    }
}