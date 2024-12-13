import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native'
import { Text, View } from '@/components/Themed';

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import Heading from '@/components/Heading'
import { User } from '..'
import Avatar from '@/components/Avatar'
import { Ionicons } from '@expo/vector-icons'
import Settings from '@/components/profile/authenticated/Settings';
import axios from 'axios';
import { getCurrentUserFromStorage } from '../actions/user/getCurrentUserFromStorage';
import { ClearTokenFromStorage } from '../actions/token/ClearTokenFromStorage';
import { Alert } from 'react-native';
import { api } from '../api/consumer/api';


const Profile = () => {
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
          <Text style={{
            fontSize: 16.8, fontWeight: "600",
            color: colorScheme == "dark" ? "#fff" : "#000"
          }}>
            Profile
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
      opacity: interpolate(scrollOffset.value - 38, [0, height / 9], [0, 1])
    }
  })

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  // useEffect(() => {
  //   const getUser = async () => {
  //     const data = await axios.get(`http://172.20.10.6:3010/api/users/6759a1189c397e6e5392d005`)
  //     setCurrentUser(data.data)
  //   }
  //   getUser()
  // },[])

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const {user} = await getCurrentUserFromStorage()
        setCurrentUser(user)
      } catch(error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  const handleLogOut = async () => {
    try {
      await api.post("/auth/logout")
      await ClearTokenFromStorage()
      setCurrentUser(null)
      console.log('successfully logout')

      Alert.alert('Success', "You're logged out")
    } catch (error) {
      Alert.alert('Error', 'Something went wrong try again')
      console.log(error)
    }
  }
  
  
  const currentUserr = {
    name: "Onix bby"
  }

  return (
    <View style={[
      styles.container, { backgroundColor: colorScheme == "dark" ? "#000" : "#fff1" }
    ]}>
      <View style={styles.separator} />
      <Animated.ScrollView ref={scrollRef}>
        <View lightColor='#fff1'>
          <Heading style={{ marginTop: 48 }} title='Profile' />
        </View>
        {currentUser ? (
          <View style={{ marginTop: 20 }} lightColor='#fff1'>
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            onPress={() => router.push("/page/account/ProfileDetails")}>
              <View style={{ flexDirection: "row", alignItems: 'center', gap: 15 }} lightColor='#fff1'>
                <Avatar src={currentUser.image} height={60} width={60} />
                <View style={{ gap: 3}} lightColor='#fff1'>
                  <Text style={{
                    color: colorScheme == "dark" ? "#fff" : "#000",
                    fontWeight: "500", fontSize: 16
                  }}>{currentUser?.displayName}</Text>
                  <Text style={{ color: colorScheme == "dark" ? "#fff" : Colors.text1 }}>Edit Profile</Text>
                </View>
              </View>

              <View lightColor='#fff1'>
                  <Ionicons name='chevron-forward' size={23} color={colorScheme == "dark" ? Colors.lightGray : Colors.darkness}/>
              </View>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={{flexDirection: "column", gap: 8, marginTop: 0}} lightColor='#fff1'>
                  <Settings />
            </View>

        
          </View>
        ) : (
          <View>
            <View style={{height: 30, backgroundColor:"red"}}/>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20
  },
  header: {
    height: "100%",
    borderBottomWidth: 0.6
  },
  separator: {
    marginVertical: 30,
    height: 1.5,
    width: "100%"
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth:1,
    borderColor: "#fff",
    color: "#fff",
    marginTop: 20
  }
})