import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles?.container}>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        ackgroundColor: 'rgba(52, 52, 52, 0.8)',
        position:'absolute'
    }
})