import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import {Roboto, colors, hp, images, wp} from '../../helper';
import {
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {settingList} from '../../helper/dummyData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {activeUserData} from '../../Redux/action/action';
import CommonView from '../../components/setting/common/commonView';

const SettingIndex = () => {
  const {navigate, goBack} = useNavigation();
  const [userData, setUserData] = useState();
  const focuse = useIsFocused();
  const dispatch = useDispatch();
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);

  useEffect(() => {
    firestore()
      .collection('Users')
      .onSnapshot(querty => {
        const data = querty?.docs?.filter(
          item => item?.data()?.Uid == auth().currentUser?.uid,
        );
        data?.map(item => {
          setUserData(item?.data());
          dispatch(activeUserData(item?.data()));
        });
      });
    console.log('first');
  }, [focuse]);
  const renderItem = ({item}) => {
    const onPress = () => {
      if (item?.lable === 'Account') {
      } else if (item?.lable === 'Privacy') {
      } else if (item?.lable === 'Avatar') {
      } else if (item?.lable === 'Chats') {
        navigate('ChatsSetting');
      } else if (item?.lable === 'Notification') {
      } else if (item?.lable === 'Storage and data') {
      } else if (item?.lable === 'App Langugae') {
      } else if (item?.lable === 'Help') {
      } else {
      }
    };

    return (
      <CommonView
        lable={item?.lable}
        leftImage={item?.image}
        subLable={item?.data}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={{backgroundColor: color?.backgroundColor, flex: 1}}>
      <CommonHeader
        right={true}
        rightIcon={images?.Search}
        headerText={'Settings'}
        backPress={goBack}
      />
      <ScrollView bounces={false}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigate('ProfileScreen')}
          style={styles?.topView}>
          <Image
            style={{
              height: hp(10),
              width: hp(10),
              borderRadius: hp(5),
              borderWidth: 1,
              borderColor: colors?.grey,
            }}
            source={
              userData?.ProfileImage == ''
                ? images?.profile1
                : {uri: userData?.ProfileImage}
            }
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: wp(3),
            }}>
            <Text
              numberOfLines={1}
              style={styles?.fontStyle}>
              {userData?.UserName}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                color: colors?.grey,
                fontFamily: Roboto?.medium,
              }}>
              {userData?.About}
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              style={styles?.imageStyle}
              source={images?.qr}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles?.imageStyle}
              source={images?.downArrow}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <FlatList
          bounces={false}
          data={settingList}
          renderItem={item => renderItem(item)}
        />
        <View style={{height: hp(10)}} />
      </ScrollView>
    </View>
  );
};

export default SettingIndex;

const ThemeStyle = color => {
  return StyleSheet.create({
  mainView: {
    height: hp(11),
    flexDirection: 'row',
    paddingHorizontal: wp(6),
    alignItems: 'center',
    borderTopWidth: 3,
    borderColor: colors?.extra,
  },
  firstImage: {
    height: hp(3.5),
    width: hp(3.5),
    tintColor: colors?.chatHeader,
  },
  mainText: {
    fontSize: 18,
    color: colors?.black,
    fontFamily: Roboto?.bold,
  },
  subText: {
    fontSize: 15,
    color: colors?.black,
    fontFamily: Roboto?.mediumItalic,
  },
  textView: {flex: 1, paddingHorizontal: wp(6)},
  topView:{
    height: hp(15),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    backgroundColor:color.backgroundColor
  },
  fontStyle:{
    fontSize: 20,
    color: color?.fontColor,
    fontFamily: Roboto?.bold,
  },
  imageStyle:{height: hp(3), width: hp(3), marginRight: wp(4),tintColor:color?.fontColor}
})};