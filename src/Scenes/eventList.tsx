/* eslint-disable prettier/prettier */
//libraries
import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

//services
import { navigate } from '../Services/navigation.services';

//components
import EventCardList from './Components/eventCardList';

//constant
import eventData from '../Data/data';
import { ListViewImage, GridViewImage } from '../Config/imageMap';
import COLORS from '../Config/colorMap'

const EventList: React.FC = ({ route }) => {
    const { params } = route;
    const [listView, setListView] = useState(true)
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <GestureRecognizer
            onSwipeLeft={() => navigate('UserEvents', { userDetails: params, flow: 'list' })}
            config={config}
            style={styles.container}
        >

            <View style={{ flex: 1 }}>
                <View style={styles.subContainer}>
                    <Text style={styles.textStyle} >Hi {params.userName}!</Text>
                    <TouchableOpacity style={{ alignItems: 'flex-end', }}
                        onPress={() => setListView(!listView)}>
                        <Image source={
                            listView ?
                                GridViewImage()
                                :
                                ListViewImage()
                        }
                            style={styles.imageContainer}
                        />

                    </TouchableOpacity>
                </View>

                <FlatList
                    key={listView ? 'h' : 'v'}
                    style={styles.list}
                    data={eventData}
                    renderItem={
                        ({ item }) => <EventCardList item={item} userDetails={params} listView={listView} />}
                    keyboardShouldPersistTaps='always'
                    numColumns={listView ? 1 : 2}
                />
            </View>
        </GestureRecognizer >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    subContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 0
    },
    imageContainer: {
        height: 30,
        width: 30,
        resizeMode: 'center',
        tintColor: 'gray'
    },
    textStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
    },
    list: {
        top: 16,
        marginBottom: 20
    }

})

export default EventList;
