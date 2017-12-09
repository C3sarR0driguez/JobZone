import { HAS_TAKEN_TUTORIAL, HAS_NOT_TAKEN_TUTORIAL} from '../actions/types';
const INITIAL_STATE = {
    tutorialTaken: null
}


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case HAS_TAKEN_TUTORIAL:
            return { tutorialTaken: true }
        case HAS_NOT_TAKEN_TUTORIAL:
             return { tutorialTaken: false }
        default: return state;
    }
}