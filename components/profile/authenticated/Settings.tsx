import { StyleSheet, TouchableOpacity, Text, useColorScheme } from 'react-native'
import { View } from "@/components/Themed"
import React from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'
import Divider from '@/components/Divider'

const Settings = () => {
    const colorScheme = useColorScheme()
    return (
        <View style={{ borderRadius: 14 }} lightColor={"#fff"} darkColor={Colors.darkness}>
            <Animated.View style={styles.container}>
                <TouchableOpacity>
                    <Animated.View style={{ marginTop: 20, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Ionicons name='person-outline' size={26} color={colorScheme == "dark"? "#fff" : "#000"} />
                        <Text style={{ color: colorScheme == "dark" ? "#fff":"#00", fontSize: 15 }}> My account</Text>
                    </Animated.View>
                </TouchableOpacity>

                <Divider />

                <TouchableOpacity>
                    <Animated.View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Ionicons name='lock-closed-outline' size={26} color={colorScheme == "dark"? "#fff" : "#000"} />
                        <Text style={{ color: colorScheme == "dark" ? "#fff":"#00", fontSize: 15 }}> Privacy</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 0,
        marginTop: 12,
        paddingHorizontal: 10,
        marginVertical: 25
    }
})