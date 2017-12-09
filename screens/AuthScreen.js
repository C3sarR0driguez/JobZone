import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {

    componentDidMount() {
        this.props.facebookLogin();
        console.log('authScreen');
        this.onAuthComplete(this.props);  
        //AsyncStorage.removeItem('fb_token'); 
    }

    componentWillReceiveProps(nextProps) {
        console.log('rerender');
         this.onAuthComplete(nextProps);   
    }

    onAuthComplete(props) {
        const { token, navigation } = props;
        console.log(this.props);
        if(token) {
            navigation.navigate('map');
        }
    }

    render() {
        return <View />
    }
}

function mapStateToProps ({ auth }) {
    const { token } = auth;
    return { token }
}

export default connect(mapStateToProps, actions)(AuthScreen);