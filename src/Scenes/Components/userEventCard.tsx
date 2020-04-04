/* eslint-disable prettier/prettier */

//libraries
import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";

//services
import { navigate } from '../../Services/navigation.services';

//assets
import { DeleteIcon } from '../../Config/imageMap'

//constants
import styles from './styles'

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
    index: number | undefined;
    deleteEvent: Function;
    drag: any
}

const UserCardList: React.FC<Props> = ({ item, userDetails, index, deleteEvent, drag }: Props) => {

    return (
        <TouchableOpacity style={styles.container}
            onLongPress={drag}
            onPress={() => navigate('EventDetails', { cardData: item, userDetails: userDetails })}>
            <View style={styles.childContainer}>
                <View style={styles.subContainerOne}>
                    <Image source={{ uri: item.thumbnail }}
                        style={styles.imageContainer} />
                </View>
                <View style={styles.subcontainerTwoUser}>
                    <Text style={styles.textStyle}>
                        {item.event}
                    </Text>
                </View>
                <TouchableOpacity style={{ ...styles.subContainerOneUser, ...{ alignItems: 'flex-end' } }}
                    onPress={() => deleteEvent(index)}
                >
                    <Image source={DeleteIcon()}
                        style={{ height: 28, width: 28, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity >
    );
}

export default UserCardList;
