import React, { useEffect } from 'react';
import {Alert, BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import {string, images, colors, fontSize, hp, wp, Roboto} from '../../helper';
import CommonButton from '../../components/common/CommonButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const {navigate} = useNavigation();

  return (
    <View style={styles?.mainContainer}>
      <View style={styles?.headerView}>
        <Text style={styles?.welcomeText}>{string?.welcomeText}</Text>
      </View>
      <Image style={styles?.themeImage} source={images?.theme} />
      <Text style={styles?.termTextStyle}>
        {string?.terms1}
        <Text style={{color: colors?.selectText}}>{string?.terms2}</Text>
        {string?.terms3}
        <Text style={{color: colors?.selectText}}>{string?.terms4}</Text>
      </Text>
      <CommonButton
      onPress={()=>{
       
        navigate('PhoneAuth')
      }}
      buttonText={string?.buttonText}
      />
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={styles?.smallText}>{string?.from}</Text>
          <Text style={styles?.normalText}>{string?.brandName}</Text>
        </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors?.backgroundColor,
  },
  termTextStyle: {
    width: '50%',
    fontSize: 12,
   fontFamily:Roboto?.medium,
    width: wp(78),
    color: colors?.black,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: hp(6.77),
  },
  themeImage: {
    height: hp(30.78),
    width: hp(30.78),
    alignSelf: 'center',
    marginTop: hp(7),
  },
  welcomeText: {
    fontSize: fontSize(30),
    fontFamily:Roboto?.bold,
    color: colors?.black,
  },
  headerView: {
    alignItems: 'center',
    marginTop: hp(10.34),
  },
  smallText: {
    fontSize: 10,
    color: colors?.black,
  },
  normalText: {
    fontSize: 15,
    color: colors?.black,
  },
});
