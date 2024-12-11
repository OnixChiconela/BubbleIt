import { api } from "@/app/api/consumer/api"

export const getUserConversations = async (userId: string) => {
    try {
        const conversations = await api.get(`/conversations/user-conversations/${userId}`)
        console.log("conversas do user: ", conversations.data)
        return conversations.data
    } catch (error) {
        console.log(`Something g went wrong`)
    }
}

