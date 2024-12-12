import { User } from "@/app"
import { api } from "@/app/api/consumer/api"
import { saveTokenToStore } from "../token/saveTokenToStore"

export const logIn = async (email: string, password: string) => {
    try {
        const response = await api.post("/auth/create-login", {
            email,
            hashedPassword: password
        })
        return response.data
    } catch (error: any) {
        console.log("login error: ", error.response?.data || error.message)
    }
}