import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, hp, wp } from '../../helper'

const CommonButton = ({buttonText,additionalStyle,additionalTextStyle,onPress,edit}) => {
  return (
    <>
    {edit ? <View
     
    //  onPress={onPress}
    //  activeOpacity={1}
      style={[styles?.container,additionalStyle]}
      >
       <Text style={[{fontSize:14, fontWeight:'400', color:colors?.black},additionalTextStyle]}>{buttonText}</Text>
     </View>
     :
     <TouchableOpacity
     
    onPress={onPress}
    // activeOpacity={1}
     style={[styles?.container,additionalStyle]}
     >
      <Text style={[{fontSize:14, fontWeight:'400', color:colors?.black},additionalTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>}
    </>
  )
}

export default CommonButton

const styles = StyleSheet.create({

    container:{
        height:hp(4.72),
        width: wp(80),
        backgroundColor: colors?.darkColor,
        justifyContent:'center',
        alignItems:'center', alignSelf:'center',
        marginTop:hp(2.95), borderRadius: hp(0.5)
    }

})