import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import welcomeReducer from './welcome-reducer';
import jobReducer from './job-reducer';
import likedJobsReducer from './likes-reducer';


const reducers = combineReducers({
    auth: authReducer,
    welcome: welcomeReducer,
    jobs: jobReducer,
    likes: likedJobsReducer
});

export default reducers;