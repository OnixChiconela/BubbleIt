import { StatusBar, StyleSheet, TextInput, useColorScheme } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import Heading from '@/components/Heading';
import Divider from '@/components/Divider';
import Colors from '@/constants/Colors';
import Conversation from '@/components/conversations/Conversation';

export default function TabOneScreen() {
  const navigation = useNavigation()
  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[styles.header, animatedHeader]}>
          <StatusBar backgroundColor={colorScheme == "dark" ? "#fff" : "#000"}/>
        </Animated.View>
      ),
      headerTitle: () => (
        <Animated.View style={animatedText}>
          <Text style={{ fontSize: 16.8, fontWeight: "600", fontFamily: "mon-sb" }}>Chats</Text>
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
      opacity: interpolate(scrollOffset.value - 38, [0, height / 9], [0, 1])
    }
  })

  const currentUser = {
    id: "sgdsuid65i7sdhjhls",
    email: "jamil@gmail.com",
    image: "",
    displayName: "Jamil"
  }
  return (
    <View style={styles.container}>
      
      <View style={styles.separator}/>
      <Animated.ScrollView ref={scrollRef}>
        <View>
          <Heading style={{ marginTop: 48 }} title='Chats' />
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={{ marginTop: 0 }}>
          <TextInput
            style={[colorScheme == "dark" ? styles.lightInput : styles.darkInput, {
              color: colorScheme == "dark" ? Colors.lightGray : Colors.gray
            }]}
            placeholder='Search'
            placeholderTextColor={colorScheme == "dark" ? Colors.lightGray : "#000"}
          />
        </View>
        <View style={{marginTop: 30}}>
          <Conversation currentUser={currentUser}/>
        </View>
      </Animated.ScrollView>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20,
  },
  header: {
    height: "100%",
    borderBottomWidth: 0.5,
  },
  lightInput: {
    height: 50,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors.darkness
  },
  darkInput: {
    height: 50,
    borderRadius: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#F6F6F6"
  },
  separator: {
    marginVertical: 30,
    height: 1.4,
    width: '100%',
  },
});
