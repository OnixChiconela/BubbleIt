import { api } from "@/app/api/consumer/api"

export const deleteAccount = async (userId?: string) => {
    try{
        const user = await api.delete(`/users/delete-account/${userId}`)
        console.log("user ", user, " have been deleted")
    } catch (error) {
        console.log("Something went wrong, cannot delete user: ", error)
    }
}