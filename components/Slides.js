import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderLastSlide(index) {
        const lastIndex = this.props.data.length - 1;
        const { onComplete } = this.props;
        if (index !== lastIndex) return;
        return (
            <Button
                title="Onwards!"
                buttonStyle={styles.buttonStyle}
                onPress={onComplete}
            />
        )
    }

    renderSlides() {
    
        const { data } = this.props;
        const slides = data.map((slide, index) => (
            <View key={`slide->${slide.text}`} style={[styles.slideStyle, { backgroundColor: slide.bgColor }]}>
                <Text style={styles.slideTextStyle}>{slide.text}</Text>
                {this.renderLastSlide(index)}
            </View>
        ));

        return slides;
    }

    render() {
        return (
            <ScrollView
                pagingEnabled
                horizontal
                style={{ flex: 1 }}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    slideTextStyle: {
        color: '#fff',
        fontSize: 30
    },
    buttonStyle: {
        marginTop: 15,
        backgroundColor: '#0288D1'
    }
}

export default Slides;
