import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { AppLoading } from 'expo';
import _ from 'lodash';

const SLIDES_DATA = [
    { text: 'Welcome to your job App !!', bgColor: '#00b8e6' },
    { text: 'Set your location, then swipe away', bgColor: '#00cc99' },
    { text: 'Let\'s have adventures', bgColor: '#ff3d4d' },
]


class WelcomeScreen extends Component {

    componentWillMount() {
        const { hasTakenTutorial } = this.props;
        hasTakenTutorial();    
    }

    onSlidesComplete() {
        const { navigation } = this.props;
        navigation.navigate('auth');
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.tutorialTaken) {
            this.props.navigation.navigate('home');
        }
    }

    render() {
        return (
            <Slides data={SLIDES_DATA} onComplete={this.onSlidesComplete.bind(this)} />
        );
    }
}

function mapStateToProps({ welcome }) {
    const { tutorialTaken } = welcome;
    return { tutorialTaken }
}

export default connect(mapStateToProps, { hasTakenTutorial: actions.hasTakenTutorial })(WelcomeScreen);
