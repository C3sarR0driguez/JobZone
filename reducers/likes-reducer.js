import { LIKE_JOB, CLEAR_LIKED_JOBS } from '../actions/types';
import _ from 'lodash';
//import { REHYDRATE } from 'redux-persist';
const INITIAL_STATE = {
    likedJobs: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /*case REHYDRATE: {
            return action.payload.likedJobs || [];
        }*/
        case LIKE_JOB:
            return _uniqBy([action.payload.likedJobs, ...state.likedJobs], 'jobkey');
        case CLEAR_LIKED_JOBS:
            return { likedJobs: [] }
        default:
            return state;
    }
}