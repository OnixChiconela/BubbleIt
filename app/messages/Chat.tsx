import { Button, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Message, User } from '..'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import ClientMessages from './ClientMessages'
import { io, Socket } from "socket.io-client"
import { getConversationMessage } from '../actions/conversations/getConversationMessages'

const Chat = () => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme();

    const { id } = useLocalSearchParams()
    const { receiverId } = useLocalSearchParams()
    const { name } = useLocalSearchParams()
    id as string
    receiverId as string

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "username",
            headerTransparent: true,
            headerLeft: () => (
                <TouchableOpacity>
                    <Ionicons
                        name='chevron-back' size={22}
                        color={colorScheme == "dark" ? "#fff" : "#000"}
                    />
                </TouchableOpacity>
            ),
            headerBackground: () => (
                <Animated.View style={[styles.header, animatedHeader]} />
            )
        })
    })

    const height = 100
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const animatedHeader = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, height / 4.5], [0, 1]),
            backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty
        }
    })

    const [inputMessage, setInputMessage] = useState("")
    const [socket, setSocket] = useState<Socket | null>(null)
    const [currentUser, setCurrentUser] = useState<User>()
    const [messages, setMessages] = useState<Message[] | undefined>([])

    //Initializing connection with server socket
    useEffect(() => {
        const newSocket = io(process.env.SOCKET, {
            query: { userId: currentUser?.id }
        })
        setSocket(newSocket);
        newSocket.on('sendMessage', (message) => {
            setMessages(message.content)
        })
        newSocket.on("receiveMessage", (message) => {
            setMessages(message.content)
        })
        return () => {
            newSocket.disconnect()
        }
    }, [currentUser])

    useEffect(() => {
        const fetchUser = async () => {
            try {

            } catch (error) {

            }
        }
        fetchUser()
    }, [])

    // Open local database
    // useEffect(() => {
    //     const setupDatabase = async () => {
    //         try {
    //             const db = await SQLite.openDatabaseAsync('chat.db')
    //             await initializeDatabase(db)
    //         } catch (error) {
    //             throw Error
    //         }
    //     }
    // },[])

    //---------------Messeges_operations----------------\\
    const sendMessage = async () => {
        if (socket) {
            if (!currentUser?.id) {
                console.warn("user was not found");
                return
            }

            const newMessage = {
                content: inputMessage,
                senderId: currentUser.id,
                receiverId: receiverId,
                conversationId: id as string
            }
            socket.emit("send_message", newMessage)
            setInputMessage('')

            // try {
            //     await insertMessage(newMessage.content, newMessage.senderId, newMessage.receiverId, newMessage.conversationId)
            //     const fetchedMessages: unknown[] | undefined = await getMessages();
            //     if (fetchedMessages && Array.isArray(fetchedMessages)) {
            //         const validMessages = fetchedMessages as Message[]
            //         setMessages(validMessages)
            //     }
            // } catch (error) {

            // }
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const messages = await getConversationMessage(id)
                setMessages(messages)
            } catch (error) {
                console.log("Cannot fetch messages: ", error)
            }
        }
        fetchMessages()
    }, [])

    const user = {
        id: "sgdsuid65i7sdhjhls"
    }
    console.log(user.id);
    console.log(receiverId);


    const message = [
        {
            id: "djhsladjhsajld",
            senderId: user.id,
            content: "Hi this's message from current user yho",
            timeStamp: new Date(2024),
            receiver: {
                id: receiverId,
                email: "email@gmail.com",
                displayName: "James"
            }
        },
        {
            id: "asdhgahdasld",
            senderId: receiverId,
            content: "this can be a long conversation if you wont pay me, your bitch ass",
            timeStamp: new Date(2024 - 12),
            receiver: {
                id: user.id,
                email: "email@gmail.com",
                displayName: "James"
            }
        }
    ]

    const inputWidth = Dimensions.get("screen").width / 1.45
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "height" : "padding"}
        >
            <Animated.ScrollView
                style={[styles.container, { backgroundColor: colorScheme == "dark" ? "#000" : "#fff" }]}
                ref={scrollRef}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Text style={{ color: colorScheme == "dark" ? "#fff" : Colors.text1 }}>Message from server</Text>
                </View>
                <ClientMessages messages={messages} />
            </Animated.ScrollView>
            <View style={[styles.footer, {
                backgroundColor: colorScheme == "dark" ? Colors.darkness : "#fff",
                borderTopColor: colorScheme == "dark" ? "rgba(255,255,255,0.1)" : "#eee"
            }]}>
                <View style={[styles.footerContainer, {}]}>
                    <TextInput
                        value={inputMessage}
                        onChangeText={setInputMessage}
                        style={{
                            width: inputWidth,
                            borderWidth: 1,
                            height: 45,
                            borderColor: colorScheme == "dark" ? "rgba(255,255,255,0.1)" : "#ccc",
                            backgroundColor: colorScheme == "dark" ? "rgba(255,255,255,0.1)" : Colors.empty,
                            color: colorScheme == "dark" ? "#fff" : "#000",
                            borderRadius: 99,
                            padding: 10
                        }}
                    />
                    <Button title='send' />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 100
    },
    info: {
        height: 120,
        width: "85%",
        backgroundColor: "#EB4D3D",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 10
    },
    header: {
        // backgroundColor: "#fff",
        height: "100%",
        borderBottomWidth: 0.6,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 90,
        borderTopWidth: 1,
        // borderTopColor: Colors.gray,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15
    },
    footerContainer: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
})