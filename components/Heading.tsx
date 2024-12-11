'use client'

import Colors from "@/constants/Colors";
import { View, StyleSheet, Text, TextStyle, ViewStyle, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";

interface HeadingProps {
    title?: string;
    //style: TextStyle
    subtitle?: string;
    medium?: string
    small?: string
    center?: boolean;
    style?: TextStyle
    titleStyle?: TextStyle
}

const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    medium,
    small,
    center,
    style,
    titleStyle
}) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[center ? styles.center : styles.start, style]}>
            {title && title.length > 0 && (
                <Animated.View >
                    <Animated.Text style={[{
                        fontSize: 34,
                        lineHeight: 32,
                        fontWeight: '600',
                        color: colorScheme == "dark" ? "#fff" : Colors.text1
                    }, titleStyle]}>
                        {title}
                    </Animated.Text>
                </Animated.View>
            )}
            {medium && medium?.length > 0 && (
                <View>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 28,
                        color: colorScheme == "dark" ? "#fff" : Colors.text1
                    }}>
                        {medium}
                    </Text>
                </View>
            )}

            {small && small.length > 0 && (
                <View>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 22,
                        color: colorScheme == "dark" ? "#fff" : Colors.text1
                    }}>
                        {small}
                    </Text>
                </View>
            )}
            {subtitle && subtitle.length > 0 && (
                <View>
                    <Text style={{
                        fontWeight: '300',
                        fontSize: 18,
                        color: colorScheme == "dark" ? "#fff" : Colors.text1
                    }}>
                        {subtitle}
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center"
    },
    start: {

    }
})

export default Heading;