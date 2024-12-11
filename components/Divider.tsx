import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import {View} from "@/components/Themed"
import React from 'react'

interface DividerProps {
  style?: StyleProp<ViewStyle>
}

const Divider: React.FC<DividerProps> = ({ style }) => {
    return <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    ;
  };
  
  const styles = StyleSheet.create({
    separator: {
      marginVertical: 20,
      height: 1,
      width: '100%',
    },
  });

export default Divider
