/* eslint-disable prettier/prettier */
// Services file for storage

import AsyncStorage from "@react-native-community/async-storage";

export async function updateEvents(userName: string, updatedEvents: Array<object>) {
    const allUsers = await getData('allUsers');
    allUsers[`${userName}`] = updatedEvents;
    await setData('allUsers', JSON.stringify(allUsers))
}

export async function setData(key: string, value: any) {
    try {
        await AsyncStorage.setItem(key, value)
    }
    catch (error) {
        console.log('err', error)
    }
}

export async function getData(key: string) {
    let data: any
    try {
        let value = await AsyncStorage.getItem(key);
        if (value !== null) {
            data = JSON.parse(value)
            return data
        }
    }
    catch (error) {
        console.log('error', error)
    }
}
