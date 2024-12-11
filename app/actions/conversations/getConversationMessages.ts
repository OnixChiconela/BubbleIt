import { api } from "../../api/consumer/api"

export const getConversationMessage = async (conversationId: string | string[] | undefined) => {
    try {
        const messages = await api(`conversations/${conversationId}/messages`)
        return messages.data
    } catch (error) {
        throw new Error()
    }
}