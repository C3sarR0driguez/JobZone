import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Swipe from '../components/Swipe';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { Dimensions, Platform } from 'react-native';
import { likeJob } from '../actions';

const { width, height } = Dimensions.get('window');

const getRelativeWidth = (dimension => {
    return percentage => {
        return getPercentage(dimension, percentage);
    }
})(width);

function getPercentage(max, percentage) {
    //max => 100
    //? => percentage
    return Math.round((percentage * max / 100));
}

class DeckScreen extends Component {

    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => <Icon size={25} name="description" color={tintColor} />
    }

    renderCard(job) {
        const { detailWrapperStyle, jobDescriptionStyle } = styles;
        const jobDescription = job.snippet.replace(/<b>|<\/b>/g, '');
        const cacheEnabled = Platform.OS === 'android';
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        }
        return (
            < Card
                title={job.jobtitle}>
                <View style={{ height: 200, width: 250 }}>
                    <MapView
                        scrollEnabled={false}
                        style={{ flex: 1 }}
                        cacheEnabled={cacheEnabled}
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={detailWrapperStyle}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <View>
                    <Text style={jobDescriptionStyle}>{jobDescription}</Text>
                </View>
            </Card>
        );
    }

    renderNoMoreCards() {
        return (
            <Card title="No more jobs available" >
                <Button
                    title="Back to map"
                    large
                    icon={{ name: 'my-location' }}
                    backgroundColor="#03A9F4"
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return (
            <View>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard.bind(this)}
                    renderNoMoreCards={this.renderNoMoreCards.bind(this)}
                    propKey={job => job.jobkey}
                    onSwipeRight={job => this.props.likeJob(job)}
                />
            </View>
        );
    }
}
const mapStateToProps = ({ jobs }) => {
    return {
        jobs: jobs.results
    };
}

const styles = {
    detailWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
    jobDescriptionStyle: {
        textAlign: 'justify'
    }
}

export default connect(mapStateToProps, { likeJob })(DeckScreen);