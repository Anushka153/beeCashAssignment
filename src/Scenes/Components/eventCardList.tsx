/* eslint-disable prettier/prettier */

//libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image, } from "react-native";
import { navigate } from '../../Services/navigation.services';

//constants
import styles from './styles'

//assets
import { LocationIcon } from '../../Config/imageMap'

interface Children {
    id: Number;
    event: string;
    location: string;
    paid: boolean;
    thumbnail: string;
}

interface UserParams {
    userName: string;
    userData: Array<object>
}

interface Props {
    item: Children;
    userDetails: UserParams;
    listView: boolean;
}

const EventCardList: React.FC<Props> = ({ item, userDetails, listView }: Props) => {

    const onItemClick = () => {
        navigate('EventDetails', { cardData: item, userDetails: userDetails })
    }

    if (!listView)
        return (
            <TouchableOpacity style={styles.containertwo}
                onPress={onItemClick}>

                <View style={styles.subContainerOnetwo}>
                    <Image source={{ uri: item.thumbnail }}
                        style={{ height: 100, width: 100, resizeMode: 'contain' }} />
                </View>
                <View style={styles.subContainerTwotwo}>
                    <Text style={styles.textStyle}>
                        {item.event}
                    </Text>
                </View>

            </TouchableOpacity >
        );

    return (
        <TouchableOpacity style={styles.container}
            onPress={onItemClick}>
            <View style={styles.childContainer}>
                <View style={styles.subContainerOne}>
                    <Image source={{ uri: item.thumbnail }}
                        style={styles.imageContainer} />
                </View>
                <View style={styles.subContainerTwo}>
                    <Text style={{ ...styles.textStyle, ...{ fontSize: 18 } }}>
                        {item.event}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={LocationIcon()}
                            style={{ height: 18, width: 18, resizeMode: 'contain', marginRight: 5 }} />
                        <Text style={styles.textStyle} >
                            {item.location}
                        </Text>

                    </View>
                    <Text style={styles.textStyle}>
                        {item.paid ? 'Paid' : 'Free'} Entry
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default EventCardList;
