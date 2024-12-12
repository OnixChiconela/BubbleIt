import { useColorScheme } from "react-native"

export type User = {
    id: string
    qrCodeId: string
    displayName: string
    email: string
    image: string
    qrCodeImage: string
}

export type Message = {
    id: string
    senderId: string
    content: string
    timeStamp: Date

    receiver: User
}

export type Conversations = {
    id: string
    title: string
    unreadCount: number,
    createdAt: string,
    updatedAt?: string
    participants?: UserConversation[]
    messages: Message[]
}

export type UserConversation = {
    userId: string
    conversationId: string
    user: User
}

// export const colorScheme = useColorScheme();
