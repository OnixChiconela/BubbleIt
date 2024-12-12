import { User } from "@/app"
import { api } from "@/app/api/consumer/api"


export const createUser = async(data: Partial<User>) => {
    try {
        const response = await api.post("/users/create-user", data)
        return response.data
    } catch (error) {
        throw new Error("User was not created")
    }   
}