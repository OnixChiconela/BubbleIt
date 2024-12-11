import { Alert, KeyboardAvoidingView, LayoutAnimation, Platform, Share, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, useColorScheme, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import Animated, { FadeInUp, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import Heading from '@/components/Heading';
import { Ionicons } from '@expo/vector-icons';
import { Conversations } from '..';

const Scan = () => {
  const navigation = useNavigation()
  const colorScheme = useColorScheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[styles.header, animatedHeader]} />
      ),
      headerTitle: () => (
        <Animated.View style={[animatedText]}>
          <Text style={{ fontSize: 16.8, fontWeight: "600", color: colorScheme == "dark" ? "#fff" : "#000" }}>Scan</Text>
        </Animated.View>
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
  const animatedText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value - 38, [0, height / 9], [0, 1]),
      color: colorScheme == "dark" ? "#fff" : "#000"
    }
  })
  const title = 1000
  const animatedTitle = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   translateY: interpolate(
        //     scrollOffset.value,
        //     [-title, 0, title],
        //     [-title / 2, 0, title + 0.5]
        //   )
        // },
        {
          scale: interpolate(scrollOffset.value, [-title, 0, title], [2, 1, 1])
        }
      ]
    }
  })

  const [show, setShow] = useState(false)
  const [conversation, setConversation] = useState<Conversations>()

  if (Platform.OS == "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
  const open = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setShow(!show)
  }

  const shareChatId = async () => {
    try {
      // if (!conversation) return

      await Share.share({
        title: conversation?.title,
        url: "url for new conversation"
      })
    } catch (error) {
      Alert.alert("Oops! something went wrong", "cannot share new chat id")
      console.log("error ", error)
    }
  }

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" ? "height" : "padding"}>
    <View style={[
      styles.container,
      { backgroundColor: colorScheme == "dark" ? "#000" : "#fff" }
    ]}>
      <View style={styles.separator} />
      <Animated.ScrollView ref={scrollRef}>
        <View style={animatedTitle}>
          <Heading title='Scan' style={{ marginTop: 48 }} titleStyle={animatedTitle}
            subtitle='Generate a qr code or sent your chat id to quicky initiate a new conversation'
          />
        </View>
        <View style={{ marginTop: 35, flexDirection: "column", gap: 20 }}>
          <TouchableOpacity style={[styles.toggles,
            { backgroundColor: colorScheme == "dark" ? Colors.gray : Colors.empty }]}
            onPress={() => shareChatId()}
          >
            <View>
              <Text style={{ fontSize: 16, color: colorScheme == "dark" ? Colors.empty : Colors.text1 }}>
                Share my chat id
              </Text>
            </View>
            <Ionicons name="share-outline" size={24}
              color={colorScheme == "dark" ? Colors.empty : Colors.text1}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.toggles, { backgroundColor: colorScheme == "dark" ? Colors.gray : Colors.empty }]}>
            <View>
              <Text style={{ fontSize: 16, color: colorScheme == "dark" ? Colors.empty : Colors.text1 }}>
                Generate qr code
              </Text>
            </View>
            <Ionicons name="qr-code-outline" size={24}
              color={colorScheme == "dark" ? Colors.empty : Colors.text1}
            />
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
    // </KeyboardAvoidingView>
  )
}

export default Scan

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
});
