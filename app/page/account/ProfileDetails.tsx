import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { router, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import Avatar from '@/components/Avatar'
import { getCurrentUserFromStorage } from '@/app/actions/user/getCurrentUserFromStorage'
import { User } from '@/app'

const ProfileDetails = () => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTransparent: true,
            headerBackground: () => (
                <Animated.View style={[styles.header, animatedHeader]} />
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name='chevron-back' size={22}
                        color={colorScheme == "dark" ? "#fff" : "#000"}
                    />
                </TouchableOpacity>
            )
        })
    }, [])
    const height = 100
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const animatedHeader = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, height / 4], [0, 1]),
            backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty
        }
    })

    const [isEditing, setIsEditing] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const [currentUser, setCurrentUser] = useState<User | null>(null)

    useEffect(() => {
        const user = async() => {
            try {
                const {user} = await getCurrentUserFromStorage()
                setCurrentUser(user)
            } catch (error) {

            }
        }
        user()
    }, [])
    return (
        <View style={[
            styles.container, { backgroundColor: colorScheme == "dark" ? "#000" : "#fff1" }
        ]}>
            <View style={styles.separator} />

            <Animated.ScrollView ref={scrollRef} style={{ paddingTop: 50, paddingHorizontal: 10 }}>
                <View style={[
                    styles.card,
                    { backgroundColor: colorScheme == "dark" ? Colors.darkness : "#fff" }
                ]}>
                    <View style={[
                        styles.cardContainer,
                    ]}>
                        <TouchableOpacity>
                            <Avatar src={currentUser?.image} height={150} width={150} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 20, fontWeight: "600",
                            color: colorScheme == "dark" ? "#fff" : "#000"
                        }}>
                            {isEditing ? (
                                <TextInput
                                    style={[{
                                        fontSize: 20, fontWeight: "600",
                                        color: colorScheme == "dark" ? "#fff" : "#000"
                                    }]}
                                    value='Onix'
                                    returnKeyType='done'
                                />
                            ) : (
                                <TouchableOpacity onPress={() => setIsEditing(true)}>
                                    <Text style={{
                                        fontSize: 20, fontWeight: "600",
                                        color: colorScheme == "dark" ? "#fff" : "#000"
                                    }}>{currentUser?.displayName}</Text>
                                </TouchableOpacity>
                            )}
                        </Text>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default ProfileDetails

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        height: "100%"
    },
    header: {
        height: "100%",
        borderBottomWidth: 0.6
    },
    card: {
        width: "100%",
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 0,
        borderRadius: 12,

        elevation: 4,
        shadowColor: Colors.text1,
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 1,
            height: 1
        }
    },
    cardContainer: {
        flexDirection: "column",
        alignItems: "center",
        gap: 25
    },
    separator: {
        marginVertical: 30,
        height: 1.5,
        width: "100%"
    },
})