/* eslint-disable prettier/prettier */
//library
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

//services
import { navigate } from '../Services/navigation.services';
import { getData, setData } from '../Utils/storage';

//assets
import { EventImage } from '../Config/imageMap'

//constants
import COLORS from '../Config/colorMap';


const LoginScene: React.FC = ({ }) => {
    const [user, setUserName] = useState('');

    const onSubmit = async () => {
        let allUsers = await getData('allUsers');
        if (allUsers === undefined || !allUsers[`${user}`]) {  //@todo: make case sensitive
            if (allUsers === undefined)
                allUsers = {}
            allUsers[`${user}`] = []
            await setData('allUsers', JSON.stringify(allUsers))
        }
        navigate('EventList', { userName: user, userData: allUsers[`${user}`] })
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Image source={EventImage()}
                    style={styles.imageContainer} />
            </View>
            <TextInput
                style={styles.textInputStyle}
                placeholder={'Enter name'}
                placeholderTextColor={'#000'}
                value={user}
                onChangeText={(text) => setUserName(text)}
                returnKeyType={'done'}
            />
            <TouchableOpacity style={{ ...styles.touchableStyle, ...{ backgroundColor: !(user === '') ? COLORS.PRIMARY : COLORS.PRIMARY_DISABLE, } }}
                onPress={onSubmit}
                disabled={user === '' ? true : false}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: COLORS.WHITE,
    },
    touchableStyle: {
        marginTop: 24,
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.PRIMARY_DISABLE,
    },
    textInputStyle: {
        marginTop: 24,
        backgroundColor: COLORS.WHITE,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.PRIMARY_DISABLE,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 50,
    },
    imageContainer: {
        height: 80,
        width: 80,
        resizeMode: 'contain',
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        fontWeight: 'bold'
    }

})

export default LoginScene;
