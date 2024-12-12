import { StyleSheet, Text, TouchableOpacity, useColorScheme, View, ViewStyle } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface ButtonProps {
    title: string | undefined
    onPress: () => void
    disabled?: boolean
    black?: boolean
    white?: boolean
    small?: boolean
    medium?: boolean
    icon?: typeof Ionicons;
}

const CustomButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled,
    black,
    small,
    white,
    medium,
    icon: Ionicons
}) => {
    const colorSchema = useColorScheme()
    const buttonStyle = [
        styles.button,
        black ? styles.blackButton : styles.filledButton,
        // white ? styles.whiteButton : styles.filledButton,
        small ? styles.smallButton : styles.bigButton,
        medium ? styles.mediumButton : styles.bigButton,
        disabled ? styles.disabledButton : null
    ]
    const styleText = [
        styles.buttonText,
        small ? styles.smallText : styles.bigText,
        black ? styles.blackButtonText : styles.filledButtonText
    ]
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[buttonStyle]}
        >
            <View style={{
                position: 'absolute',
                left: 16,
                top: 12
            }}>
                {Ionicons && (
                    <Ionicons
                        size={24}
                    />
                )}
            </View>
            <Text style={styleText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderWidth: 2,
        height: 55
    },
    filledButton: {
        backgroundColor: "orange",
        borderColor: "#D5642F"
    },
    blackButton: {
        backgroundColor: "#000",
        borderColor: "#000"
    },
    whiteButton: {
        backgroundColor: "#fff",
        borderColor: "#000"
    },
    smallButton: {
        paddingVertical: 8,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
        borderWidth: 1.5,
        width: "30%",
        height: 50
    },
    mediumButton: {
        paddingVertical: 8,
        marginTop: 6,
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1.5,
        width: '50%'
    },
    bigButton: {
        paddingVertical: 12,
        marginTop: 6,
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 1,
    },
    disabledButton: {
        opacity: 0.7,
    },
    buttonText: {
        color: 'white',
    },
    filledButtonText: {
        color: Colors.text3,
    },
    blackButtonText: {
        color: '#fff'
    },
    whiteButtonText: {
        color: '#fff'
    },
    outlineButtonText: {
        color: "#fff",
    },
    smallText: {
        fontSize: 14,
        fontWeight: '500',
    },
    bigText: {
        fontSize: 18,
        fontWeight: '500',
    },
})