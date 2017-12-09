import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { MapView } from 'expo';
import { fetchJobs } from '../actions';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

class MapScreen extends Component {

    static navigationOptions = {
        title: 'Map',
        tabBarIcon:({ tintColor }) => <Icon size={25} name="my-location" color={tintColor} />
    }

    state = {
        mapLoaded: false,
        region: {
            latitude: 37,
            longitude: -122,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        }
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
        console.log(this.state);
    }

    onRegionChangeComplete(region) {
        console.log(region.longitue);
        this.setState({ region });
    }

    onJobsFetched() {
        const { navigation } = this.props;
        navigation.navigate('deck');
    }

    onButtonPress() {
        const [{ region }, { fetchJobs }] = [this.state, this.props]
        fetchJobs(region, this.onJobsFetched.bind(this));
    }

    render() {
        console.log('renderstate', this.state);
        const { mapLoaded } = this.state;
        if (!mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size='large' />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                />
                <View style={styles.buttonContainerStyle}>
                    <Button
                        title="Search this area"
                        large
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onButtonPress.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ jobs }) => {
    return {
        result: jobs.result
    };
}

const styles = {
    buttonContainerStyle: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        marginRight: 20,
        marginLeft: 20,
    }
}

export default connect(mapStateToProps, { fetchJobs })(MapScreen);