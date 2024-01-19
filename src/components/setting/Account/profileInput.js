import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, hp, images, wp} from '../../../helper';
import {TextInput} from 'react-native-paper';
import { useSelector } from 'react-redux';

const ProfileInput = ({lable, value, onChangeText, leftIcon,editable}) => {
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);
  return (
    <View style={styles?.mainView}>
      <Image
        source={leftIcon}
        resizeMode="contain"
        tintColor={colors?.chatHeader}
        style={styles?.imageStyle}
      />
      <TextInput
      editable={editable}
      contentStyle={{color:color?.fontColor}}
        value={value}
        label={lable}
        style={styles.input}
        onChangeText={onChangeText}
        activeUnderlineColor={color?.tabColor}
      />
      {/* <TouchableOpacity onPress={onEditPress}>
        <Image
          resizeMode="contain"
          source={rightIcon}
          style={styles?.imageStyle}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfileInput;

const ThemeStyle = color => {
  return StyleSheet.create({
  imageStyle: {height: hp(2.5), width: hp(2.5)},
  mainView: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginTop: hp(2),
  },
  profielStyle: {
    height: hp(20),
    width: hp(20),
    marginVertical: hp(3),
    borderWidth: 1,
    borderColor: colors?.grey,
    borderRadius: hp(10),
  },
  editView: {
    height: hp(5.5),
    width: hp(5.5),
    backgroundColor: colors?.chatHeader,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: color?.backgroundColor,
    height: hp(7),
    marginHorizontal: wp(3),
    // width: wp(90),
    // marginVertical: 16,
  },
});
}