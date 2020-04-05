/* eslint-disable prettier/prettier */
//libraries
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';

//storage
import { updateEvents } from '../Utils/storage';

//constants
import COLORS from '../Config/colorMap'
import GestureRecognizer from 'react-native-swipe-gestures';
import { navigate } from '../Services/navigation.services';

let screenHeight = Dimensions.get('window').height;

const EventDetails: React.FC = ({ route }) => {
    const { params } = route;
    const { cardData, userDetails } = params;
    const [alreadyTracking, setAlreadyTracking] = useState(false)
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    useEffect(() => {
        getTrackStatus(route.params.userDetails.userData)
    }, [])

    const getTrackStatus = (data: Array<object>) => {
        const status = data.filter((item) => item.id === cardData.id)
        if (status.length)
            setAlreadyTracking(true)
        else
            setAlreadyTracking(false)
    }

    const trackEvent = () => {
        userDetails.userData.push(cardData);
        updateEvents(userDetails.userName, userDetails.userData)
        setAlreadyTracking(true)
    }

    return (
        <GestureRecognizer
            onSwipeLeft={() => navigate('UserEvents', { userDetails: userDetails, flow: 'details', getTrack: getTrackStatus })}
            config={config}
            style={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image source={{ uri: cardData.thumbnail }}
                        style={styles.imageContainer} />
                    <Text style={styles.textStyle}>
                        Event Name: {cardData.event}
                    </Text>
                    <Text style={styles.textStyle}>
                        Location: {cardData.location}
                    </Text>
                    <Text style={styles.textStyle}>
                        Entry: {cardData.paid ? 'Paid' : 'Free'}
                    </Text>
                </View>

                <TouchableOpacity style={{ ...styles.touchableCont, ...{ backgroundColor: !alreadyTracking ? COLORS.PRIMARY : COLORS.PRIMARY_DISABLE } }}
                    onPress={trackEvent}
                    disabled={alreadyTracking}
                >
                    <Text style={styles.buttonText}>{alreadyTracking ? "Tracking" : "Track"}</Text>
                </TouchableOpacity>
            </View>
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    subContainer: {
        backgroundColor: COLORS.WHITE,
        flex: 1,
        padding: 16
    },
    imageContainer: {
        height: screenHeight / 3,
        margin: 16,
        resizeMode: 'contain',
    },
    textStyle: {
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.DARK_GREY,
    },
    touchableCont: {
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        borderColor: COLORS.PRIMARY_DISABLE
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }
})

export default EventDetails;
