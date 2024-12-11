import AsyncStorage from "@react-native-async-storage/async-storage"


export const ClearTokenFromStorage = async () => {
    try {
        await AsyncStorage.removeItem('access_token')
        await AsyncStorage.removeItem('user_data')

        console.log("Token e dados do usuario foram removidos")
    } catch (error) {
        console.log("cannot remove user data and token: ", error)
    }
}