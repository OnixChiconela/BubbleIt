
import { User } from '@/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveTokenToStore = async (token: string, user: User) => {
    try {
        await AsyncStorage.setItem('access_token', token) 
        await AsyncStorage.setItem(`user_data`, JSON.stringify(user))

        console.log("Token e dados do usuario salvos com sucesso", token)
    } catch(error) {
        console.log("cannot save user  data: ", error)
    }   
}