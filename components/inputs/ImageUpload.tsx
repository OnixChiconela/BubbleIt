import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn } from 'react-native-reanimated'
import * as ImagePicker from "expo-image-picker"

import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface ImageProps {
    onChange?: (value: string) => void
    value?: string
}

const ImageUpload: React.FC<ImageProps> = ({
    value,
    onChange
}) => {
    const [image, setImage] = useState<string | null>(null)

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert('sorry, don`t have permission to access Photos')
                return
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false,

        })

        if (!result.canceled && result.assets.length > 0) {
            const selectedImage = result.assets[0].uri;
            setImage(selectedImage);
            if (onChange) {
                onChange(selectedImage);
            }
        }
    }
    const removeImage = () => {
        setImage(null);
        if (onChange) {
            onChange("");
        }
    };
    if (!image) {
        return (
            <View>
                <TouchableOpacity onPress={() => pickImage()}>
                    <Animated.View entering={FadeIn.duration(100)} style={{
                        position: 'relative',
                        borderWidth: 2,
                        padding: 5,
                        borderColor: "orange",
                        borderRadius: 999,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                        width: 120,
                        height: 120,
                        marginBottom: 10
                    }}>
                        {/* <Ionicons name='image' size={50} color='grey' />
                        <Text style={{ fontWeight: '500', color: "#fff" }}>
                            Click to upload
                        </Text> */}
                        <Image
                            source={require('@/public/images/profile.jpg')}
                            style={{
                                resizeMode: 'cover',
                                height: "100%",
                                aspectRatio: 1 / 1,
                                borderRadius: 999
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }
    if (image) {
        return (
            <View>
                <TouchableOpacity onPress={() => pickImage()}>
                    <Animated.View
                        entering={FadeIn.duration(100)}
                        style={{
                            position: 'relative',
                            borderWidth: 2,
                            padding: 5,
                            borderColor: "orange",
                            borderRadius: 999,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 4,
                            width: 120,
                            height: 120,
                            marginBottom: 10,
                        }}
                    >
                        <Image
                            source={{ uri: image }}
                            style={{
                                resizeMode: 'cover',
                                height: "100%",
                                aspectRatio: 1 / 1,
                                borderRadius: 999,
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )

    }
}

export default ImageUpload

const styles = StyleSheet.create({})