import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, hp, images, wp } from '../../helper'

const InputView = ({value,onChangeText,placeholder,placeholderTextColor,onSendPress}) => {

    const [keyboard,setKeyboardOn]=useState(false);

  return (
    <View style={{ flexDirection:'row',justifyContent:'space-evenly', width:'100%',marginBottom:hp(2)}}>
    <View style={{width:wp(80), backgroundColor:colors?.white,borderRadius:hp(5), justifyContent:'center', flexDirection:'row', paddingHorizontal:wp(3.5)}}>
        <Image
        source={images?.emoji}
        style={{height:hp(2.5), width:hp(2.5), alignSelf:'center'}}
        />
        <TextInput
        value={value}
        multiline={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{flex:1,paddingHorizontal:wp(3)}}
        />
        <View style={{flexDirection:'row', width:value ?'10%':'30%',justifyContent:value? 'flex-end' :'space-between', alignItems:'center'}}>
           <Image
            source={images?.pin}
            style={{height:hp(3.5), width:hp(3.5), left:value ? wp(1): wp(0)}}
            />
               {!value ?
               <>
               <Image
            source={images?.payment}
            resizeMode='contain'
            style={{height:hp(2.5), width:hp(2.5)}}
            />
               <Image
            source={images?.camera}
            resizeMode='contain'
            style={{height:hp(2.5), width:hp(2.5)}}
            />
            </>: null}
            </View>
    </View>
        <TouchableOpacity onPress={onSendPress} style={{backgroundColor:colors?.chatHeader, height:hp(6.15), width:hp(6.15), borderRadius:hp(5), alignItems:'center', justifyContent:'center'}}>
            <Image
            source={value ?images?.send : images?.mic_white}
            // resizeMode='contain'
            style={{height:hp(3.5), width:hp(3),tintColor:colors?.white}}
            />
        </TouchableOpacity>
    </View>
  )
}

export default InputView

const styles = StyleSheet.create({})