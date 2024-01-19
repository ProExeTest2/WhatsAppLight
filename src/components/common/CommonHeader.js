import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Roboto, colors, hp, images, wp } from '../../helper'
import { useSelector } from 'react-redux';

const CommonHeader = ({headerText,right,rightIcon,backPress}) => {
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);
  return (
    <View style={styles?.container}>
        <TouchableOpacity
        onPress={backPress}
        >
     <Image
     source={images?.backArrow}
     tintColor={colors?.backgroundColor}
     style={styles?.backIcon}
     /> 
     </TouchableOpacity>
     <Text style={styles?.headerTextStyle}>{headerText}</Text>
    {right && <Image
     source={rightIcon}
     style={styles?.searchIcon}
     tintColor={colors?.backgroundColor}
     />}
    </View>
  )
}

export default CommonHeader
const ThemeStyle = color => {
  return StyleSheet.create({
    backIcon:{height: hp(3.5), width: hp(3.5)},
    searchIcon:{height: hp(2.5), width: hp(2.5), marginRight:wp(2)},
    headerTextStyle:{
        flex:1,
        paddingHorizontal:wp(4),
        fontSize:27,
        fontFamily:Roboto?.bold,
        color: colors?.white
    },
    container:{backgroundColor:color?.chatHeader, height: hp(10), flexDirection:'row', alignItems:'center', paddingHorizontal:wp(3), elevation:5}
})
};