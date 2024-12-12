import { KeyboardType, ReturnKeyType, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';

interface Props {
    title?: string
    value?: string | number | null
    keyboardType?: KeyboardType;
    disabled?: boolean
    required?: boolean
    onChangeText?: ((text: string) => void) | undefined
    secureTextEntry?: boolean | undefined
    returnKeyType?: ReturnKeyType
}

const CustomInput: React.FC<Props> = ({
    title,
    value,
    keyboardType,
    disabled,
    required,
    onChangeText,
    secureTextEntry,
    returnKeyType
}) => {
    const colorScheme = useColorScheme()
    const [isSelected, setIsSelected] = useState(false)
    const handleFocus = () => {
        setIsSelected(true)
    }
    const handleBlur = () => {
        setIsSelected(false)
    }


    return (
        <View>
            <View style={[
                isSelected ? 
                [styles.selectedInput, {borderColor:colorScheme == "dark" ? "#fff" : "#000"}] : 
                [styles.input, {borderColor: colorScheme == "dark" ? Colors.gray : "#ABABAB"}],
                // errors ? styles.borderError : styles.border
            ]}>
                <View style={{ position: "absolute", top: 5, paddingHorizontal: 10 }}>
                    <Text style={{ color: Colors.gray, fontSize: 13 }}>{title}</Text>
                </View>

                <TextInput
                    style={styles.inputText}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    keyboardType={keyboardType}
                    editable={!disabled}
                    secureTextEntry={secureTextEntry}
                    returnKeyType={returnKeyType}



                // onPress={() => select(1)}

                >
                    <Text style={[styles.text, {color: colorScheme == "dark" ? "#fff" : "#000"}]}>
                        {value}
                    </Text>
                </TextInput>
            </View>
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        // height: 60,
        paddingVertical: 5,
        borderWidth: 0.9,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    selectedInput: {
        height: 60,
        borderWidth: 1.7,
        borderColor: "black",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    borderError: {
        borderColor: Colors.error
    },
    border: {
        borderColor: "#ABABAB",
    },
    inputText: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        fontSize: 15
    },
    text: {
        position: "absolute",
        fontSize: 16,
        fontWeight: 500,
    },
    // textError: {
    //   color: Colors.error
    // }
})