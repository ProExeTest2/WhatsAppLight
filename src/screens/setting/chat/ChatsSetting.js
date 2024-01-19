import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../../../components/common/CommonHeader';
import CommonView from '../../../components/setting/common/commonView';
import {hp, images} from '../../../helper';
import {useDispatch, useSelector} from 'react-redux';
import {theme} from '../../../Redux/action/action';

const ChatsSetting = () => {
  const {navigate, goBack} = useNavigation();
  const dispatch = useDispatch();
  const mode = useSelector(state => state?.data1?.isdarkMode);
  console.log('color', mode);
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);
  return (
    <View>
      <CommonHeader backPress={goBack} headerText={'Chats'} />
      <CommonView
        lable={'Theme'}
        leftImage={images?.brightness}
        subLable={'Dark'}
        onPress={() => {
          // console.log(
          //   mode
          // )
          // if (mode === 'false') {
            dispatch(theme(mode == 'true' ?'false':'true'));
          // } else {
          //   dispatch(theme('true'));
          // }
        }}
      />
      <View style={styles?.viewColor}></View>
    </View>
  );
};

export default ChatsSetting;
const ThemeStyle = color => {
  return StyleSheet.create({
    viewColor: {
      height: hp(10),
      width: hp(10),
      backgroundColor: color?.backgroundColor,
    },
  });
};
