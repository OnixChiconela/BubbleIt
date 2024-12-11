import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { Message, User } from '..'

interface MessagesProps {
    messages?: Message[]
}
const ClientMessages: React.FC<MessagesProps> = ({
    messages
}) => {
    const colorSchema = useColorScheme()
    const [currentUserr, setCurrentUser] = useState<User>()

    const currentUser = {
        id: "sgdsuid65i7sdhjhls",
        email: "jamil@gmail.com",
        image: "",
        displayName: "Jamil"
    }
    return (
        <View style={styles.container}>
            <View style={styles.messagesContainer}>
                {messages && messages?.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageBubble,
                            message.senderId === currentUser?.id ?
                                {
                                    alignSelf: "flex-end", backgroundColor: colorSchema == "dark" ?
                                    "#D5642F" : "#F08D47", paddingLeft: 20
                                } : // \ D35A26 \ EB8B3D \ F08D47 \ D5642F
                                {
                                    alignSelf: "flex-start", backgroundColor: colorSchema == "dark" ?
                                    Colors.darkness : Colors.empty,paddingRight: 20
                                }
                        ]}
                    >
                        <Text
                            style={[styles.messageText, {
                                color: colorSchema == "dark" ? "#fff" : "#000"
                            }]}>
                            {message.content}
                        </Text>
                        <Text
                            style={[styles.timeStamp, {
                                color: colorSchema == "dark" ?
                                    "#ccc" : Colors.text1
                            }]}>
                            {new Date(message.timeStamp).toLocaleTimeString()}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default ClientMessages

const styles = StyleSheet.create({
    container: {
    },
    messagesContainer: {
        padding: 1
    },
    messageText: {
        fontSize: 16,
    },
    timeStamp: {
        fontSize: 12,
        textAlign: 'right',
        marginTop: 7,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        maxWidth: "82%"
    },
    currentUserMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.primary,
    },
    otherUserMessage: {
        alignSelf: 'flex-start',
        backgroundColor: "red",
    },
})