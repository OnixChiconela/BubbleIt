import AsyncStorage from "@react-native-async-storage/async-storage";

const getTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('acess_token')
        if(!token) {
            throw new Error('Token nao encontrado')
        }
        console.log('Token JWT recuperado: ', token)
        return token
    } catch (err) {
        console.error('Erro ao recuperar o token', err)
        throw new Error("Erro ao recuperar o token")
    }
}

export default getTokenFromStorage