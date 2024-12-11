import { api } from "@/app/api/consumer/api"
import getTokenFromStorage from "./getTokenFromStorage"

const fetchDataWithToken = async() => {
    try {
        const token = await getTokenFromStorage()
        if(token === null || token === undefined) {
            throw new Error("Token nao encontrado")
        }
 
        const response = await api.get("/auth/status", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        //console.log("Dados recebidos", response.data)
        return response.data

    } catch(error) {
        console.error('erro ao buscar dados: ', error)
        throw error
    }

}

export default fetchDataWithToken