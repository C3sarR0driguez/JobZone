import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

const isAndroid = () => Platform.OS === 'android'

class ReviewScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => <Icon size={25} name="favorite" color={tintColor} />,
            headerRight: (
                <Button
                    onPress={() => { navigate('settings') }}
                    title="settings"
                    backgroundColor="rgba(0, 122, 255, 1)"
                />
            ),
            headerStyle: isAndroid() ? { marginTop: 24 } : null
        }
    }

    renderLikedJobs() {
        return this.props.likedJobs.map((job) => {

            const initialRegion = {
                longitude: job.longitude,
                latitude: job.latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            }
            return (
                <Card key={job.jobkey} title={job.jobtitle}>
                    <MapView
                        style={{ flex: 1 }}
                        cacheEnabled={Platform.OS === 'android'}
                        scrollEnabled={false}
                        initialRegion={initialRegion}
                    />
                    <View style={{ height: 200 }} >
                        <View style={styles.detailWrapperStyle}>
                            <Text style={styles.italicStyle}>{job.company}</Text>
                            <Text style={styles.italicStyle}>{job.formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply Now!!"
                            backgroundColor="#03A9F4"
                            onPress={() => { Linking.openURL(job.url) }}
                        />
                    </View>
                </Card>
            );
        });

    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapperStyle: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    italicStyle: {
        fontStyle: 'italic'
    }

}

function mapStateToProps({ likes }) {
    const { likedJobs } = likes;
    return { likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);