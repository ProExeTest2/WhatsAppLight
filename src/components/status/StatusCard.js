import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, hp, images, wp} from '../../helper';
import { useSelector } from 'react-redux';

const StatusCard = ({addtionalStyle,user,userName,onMainPress,isStatus,subText}) => {
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);
  return (
    <TouchableOpacity onPress={onMainPress} activeOpacity={0.8} style={[styles?.container, addtionalStyle]}>
      <TouchableOpacity style={{padding:hp(0.2),borderWidth:2.5, borderRadius:hp(5), borderColor:isStatus ? colors?.themeColor: colors?.backgroundColor}}>
        <ImageBackground borderRadius={hp(5)} style={{height:hp(6), width:hp(6), alignItems:'flex-end'}} source={images?.profile3}>
                {user &&<Image
                style={{height:hp(2.5), width:hp(2.5), top:hp(3.5), backgroundColor:colors?.backgroundColor, borderRadius: hp(3)}}
                source={images?.addStatus}
                tintColor={colors?.themeColor}
                />}
        </ImageBackground>
        </TouchableOpacity>
        <View style={{width:'76%', marginHorizontal:wp(5)}}>
        <Text
        style={styles?.textStyle}
        numberOfLines={1}
        >
            {user ? 'My Status' :userName}
        </Text>
        <Text
        style={styles?.textStyle}
        numberOfLines={1}
        >
            {user ? 'Tap To Add Status Update' :subText}
        </Text>
        </View>
        <TouchableOpacity>
        {/* <Image
        style={{height:hp(2), width: hp(2)}}
        source={images?.menu}
        resizeMode="contain"
        /> */}
        </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default StatusCard;

const ThemeStyle = color => {
  return StyleSheet.create({
    container: {
    height: hp(9.5),
    width: '97%',
    backgroundColor: color?.chatViewColor,
    alignSelf: 'center',
    alignItems:'center',
    marginTop: hp(1),
    elevation: 5,
    flexDirection:'row',
    paddingHorizontal:wp(3), borderRadius: hp(0.7),
    // justifyContent:'space-around'
  },
  textStyle:{
    color: color?.fontColor
  }
});
}
