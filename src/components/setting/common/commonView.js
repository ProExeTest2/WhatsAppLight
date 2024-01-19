import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Roboto, colors, hp, wp } from '../../../helper'
import { useSelector } from 'react-redux';

const CommonView = ({onPress,leftImage, lable, subLable}) => {
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);

  return (
    <TouchableOpacity
    activeOpacity={0.9}
      onPress={onPress}
      style={styles?.mainView}>
      <Image
        source={leftImage}
        style={styles?.firstImage}
      />
      <View style={styles?.textView}>
        <Text
          style={styles?.mainText}>
          {lable}
        </Text>
        <Text
          style={styles?.subText}>
          {subLable}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CommonView


const ThemeStyle = color => {
  return StyleSheet.create({
    mainView:{
        height: hp(11),
        flexDirection: 'row',
        paddingHorizontal: wp(6),
        alignItems: 'center',
        borderTopWidth:3,
        borderColor:color?.backgroundColor,
        backgroundColor:color?.chatViewColor
      },
      firstImage:{
        height: hp(3.5),
        width: hp(3.5),
        tintColor: colors?.chatHeader,
      },
      mainText:{
        fontSize: 18,
        color: color?.fontColor,
        fontFamily: Roboto?.bold,
      },
      subText:{
        fontSize: 15,
        color: color?.fontColor,
        fontFamily: Roboto?.mediumItalic,
      },
      textView:{flex: 1, paddingHorizontal: wp(6)}
})};