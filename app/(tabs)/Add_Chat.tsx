import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import Heading from '@/components/Heading'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const Add_Chat = () => {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[animatedHeader, styles.header]} />
      ),
      headerTitle: () => (
        <Animated.View style={[animatedText]}>
          <Text style={{
            fontSize: 16.8, fontWeight: "600",
            color: colorScheme == "dark" ? "#fff" : "#000"
          }}>
            New chat
          </Text>
        </Animated.View>
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
  const animatedText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value - 38, [0, height / 9], [0, 1]),
      color: colorScheme == "dark" ? "#fff" : "#000"
    }
  })

  return (
    <View style={[
      styles.container,
      { backgroundColor: colorScheme == "dark" ? "#000" : "#fff" }
    ]}>
      <View style={styles.separator} />
      <Animated.ScrollView ref={scrollRef}>
        <View>
          <Heading title='Start new chat' style={{ marginTop: 48 }}
            subtitle={`Ready to start a new conversation? it's easy`}
          />
        </View>
        <View style={{ marginTop: 35, flexDirection: "column", gap: 20 }}>
          <TouchableOpacity style={[styles.toggles,
          { backgroundColor: colorScheme == "dark" ? Colors.gray : Colors.empty }]}
            onPress={() => {}}
          >
            <View>
              <Text style={{ fontSize: 16, color: colorScheme == "dark" ? Colors.empty : Colors.text1 }}>
                Scan
              </Text>
            </View>
            <Ionicons name="camera-outline" size={22}
              color={colorScheme == "dark" ? Colors.empty : Colors.text1}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.toggles, { backgroundColor: colorScheme == "dark" ? Colors.gray : Colors.empty }]}>
            <View>
              <Text style={{ fontSize: 16, color: colorScheme == "dark" ? Colors.empty : Colors.text1 }}>
                My contacts
              </Text>
            </View>
            <Ionicons name="book-outline" size={24}
              color={colorScheme == "dark" ? Colors.empty : Colors.text1}
            />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default Add_Chat

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20
  },
  header: {
    height: "100%",
    borderBottomWidth: 0.6
  },
  toggles: {
    padding: 15,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderRadius: 99,
    // backgroundColor: Colors.empty,
    alignItems: "center",
    justifyContent: "space-between"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})