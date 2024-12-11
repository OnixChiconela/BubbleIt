import { User } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getCurrentUserFromStorage = async(): Promise<{token: string; user: User}> => {
    try {
        const token = await AsyncStorage.getItem(`access_token`)
        const user = await AsyncStorage.getItem(`user_data`)

        if (!token || !user) {
            throw new Error('token and user data wasn`t founded')
        }

        console.log('Token: ', token)
        console.log("user data: ", JSON.parse(user))
        // return { token, user: JSON.parse(user) as User }
        return {token, user: JSON.parse(user) as User}
    } catch (error) {
        console.log("cannot get token and data from currentuser: ", error)
        throw new Error("error")

    }
}