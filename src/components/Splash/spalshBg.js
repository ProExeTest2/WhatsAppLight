import {Image, Animated, StyleSheet, Easing} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {hp, wp} from '../../helper/globalHelper';
import {colors} from '../../helper/colorHelper';
import {images} from '../../helper/imageHelper';

const SpalshBg = ({additionlStyle}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(scaleValue, {
        toValue: 0.4, 
        duration: 1500, 
        easing: Easing.linear, 
        useNativeDriver: false, 
      }).start();
    }, 0);
  }, [scaleValue]);


  
  return (
    <Animated.View
      style={[
        {
          height: hp(17.73),
          width: hp(17.73),
          borderRadius: hp(4.93),
          backgroundColor: colors?.themeColor,
          alignItems: 'center',
          justifyContent: 'center'
        },
        additionlStyle,
        ,
        {transform: [{scale: scaleValue}]},
      ]}>
      <Image
        source={images?.logo}
        resizeMode="contain"
        style={{height: hp(12), width: hp(12)}}
      />
    </Animated.View>
  );
};

export default SpalshBg;

const styles = StyleSheet.create({});
// style={[
//
// }]
