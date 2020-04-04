/* eslint-disable prettier/prettier */
//libraries
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import DraggableFlatList from "react-native-draggable-flatlist";

//components
import UserCardList from './Components/userEventCard';

//services
import { navigate, pop } from '../Services/navigation.services';
import { updateEvents } from '../Utils/storage';

//constants
import COLORS from '../Config/colorMap'

const UserEvents: React.FC = ({ route }) => {
    const { params } = route;
    const { userDetails, flow, getTrack } = params;
    const [userEvents, setUserEvents] = useState(userDetails.userData)
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    const deleteEvent = (index: number) => {
        userEvents.splice(index, 1)
        setUserEvents((value) => { return [...value] })
        updateEvents(userDetails.userName, userEvents)
    }

    const popToLast = (events: Array<object>) => {
        getTrack(events);
        pop();
    }

    const renderEmptyContainer = () => {
        return (
            <View style={{ flex: 1, alignItems: "center", }}>
                <Text style={styles.textStyle}>Sorry! You have no trackable events.</Text>
            </View>
        )
    }
    return (
        <GestureRecognizer
            onSwipeRight={() =>
                flow === 'list' ?
                    navigate('EventList', { userName: userDetails.userName, userData: userEvents })
                    :
                    popToLast(userEvents)
            }
            config={config}
            style={styles.container}
        >
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <DraggableFlatList
                    data={userEvents}
                    renderItem={({ item, index, drag }) =>
                        <UserCardList item={item} userDetails={userDetails} index={index} deleteEvent={deleteEvent} drag={drag} />}

                    keyExtractor={(item, index) => `${item.id}`}
                    onDragEnd={({ data }: { data: Array<object> }) => {
                        setUserEvents(data)
                        updateEvents(userDetails.userName, data)
                    }}
                    activationDistance={3}
                    ListEmptyComponent={renderEmptyContainer}
                />
            </View>
        </GestureRecognizer >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.WHITE
    },
    textStyle: {
        paddingBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.DARK_GREY,
    },
})

export default UserEvents;