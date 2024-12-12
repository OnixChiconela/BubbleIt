import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { router, useNavigation } from 'expo-router'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const account = () => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "account",
            headerTransparent: true,
            headerBackground: () => (
                <Animated.View style={[styles.header, animatedHeader]} />
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name='chevron-back' color={colorScheme == "dark" ?
                        "#fff" : "#000"
                    } size={22} />
                </TouchableOpacity>
            )
        })
    })
    const height = 100
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const animatedHeader = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [0, height / 4], [0, 1]),
            backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty
        }
    })
    return (
        <View style={[
            styles.container,
            { backgroundColor: colorScheme == "dark" ? "#000" : "#fff" }
        ]}>
            <View style={styles.separator} />
            <Animated.ScrollView ref={scrollRef} style={{ paddingTop: 80, }}>
                <View style={{ flexDirection: "column", gap: 20 }}>

                    <TouchableOpacity style={[styles.containers, {
                        backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty,
                    }]}>
                        <Text style={{ marginTop: 0, color: colorScheme == "dark" ? "#fff" : "#000" }}>
                            Email address
                        </Text>
                        <Ionicons name='chevron-forward' size={22}
                            color={colorScheme == "dark" ? "#fff" : Colors.gray}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.containers, {
                        backgroundColor: colorScheme == "dark" ? Colors.darkness : Colors.empty,
                    }]}>
                        <Text style={{ marginTop: 0, color: colorScheme == "dark" ? "#fff" : "#000" }}>
                            Phone number
                        </Text>
                        <Ionicons name='chevron-forward' size={22}
                            color={colorScheme == "dark" ? "#fff" : Colors.gray}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default account

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 20
    },
    header: {
        height: "100%",
        borderBottomWidth: 0.6
    },
    containers: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})