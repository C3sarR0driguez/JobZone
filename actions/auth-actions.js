import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

export const facebookLogin = () => async dispatch => {
    let fbToken  = await AsyncStorage.getItem('fb_token');
    if(fbToken) {
        dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: fbToken });
    }
    else {
        doFacebookLogin(dispatch);
    }
}


const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('191247624782917', {
        permissions: ['public_profile']
    });
    if(type === 'cancel') {
         dispatch({type: FACEBOOK_LOGIN_FAIL});
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    
}