
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'


interface AvatarProps {
    src: string | null | undefined,
    height?: number;
    width: number
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    height,
    width
}) => {
  return (
    <View style={{}}>
      <Image 
        style={{
            height: height,
            width: width,
            borderWidth: 0.2,
            borderRadius: 100
        }}
        source={src ? {uri: src} : require('@/public/images/profile.jpg')}
      />
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({})