import { User } from "@/app"
import { api } from "@/app/api/consumer/api"

export const updateUser = async (userId: string, data: Partial<User>, token: string) => {
    try {
        const response = await api.patch(`/users/updateUser/${userId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log("error from update user", error)
    }
}