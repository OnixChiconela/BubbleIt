import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          borderTopWidth: 1,
          height: 90
        },
        tabBarItemStyle: {
          paddingVertical: 9
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => 
          <Ionicons name='chatbubble-ellipses-outline' size={size} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="Scan"
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => 
          <Ionicons name="qr-code-outline" color={color} size={size}/>,
        }}
      />
      <Tabs.Screen
        name="Add_Chat"
        options={{
          title: 'Add chat',
          tabBarIcon: ({ color, size }) => 
          <Ionicons name="add-circle-outline" color={color} size={size}/>,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => 
          <Ionicons name="person-outline" color={color} size={size}/>,
        }}
      />
    </Tabs>
  );
}
