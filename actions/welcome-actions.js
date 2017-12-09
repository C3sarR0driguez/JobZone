import { AsyncStorage } from 'react-native';
import { HAS_TAKEN_TUTORIAL, HAS_NOT_TAKEN_TUTORIAL } from './types';

export const hasTakenTutorial = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if(token) {
        return dispatch({ type: HAS_TAKEN_TUTORIAL });
    }
    dispatch({ type: HAS_NOT_TAKEN_TUTORIAL });
}