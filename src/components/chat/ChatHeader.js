import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Roboto, colors, hp, images, wp} from '../../helper';
import { useSelector } from 'react-redux';

const ChatHeader = ({
  title,
  online,
  profileImage,
  onBackPress,
  onProfilePress,
  onVideoPress,
  onCallPress,
  onMenuPress,
}) => {
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);
  return (
    <View style={styles?.headerView}>
      <TouchableOpacity onPress={onBackPress}>
        <Image source={images?.backArrow} style={styles?.imageView} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onProfilePress}>
        <Image source={profileImage} style={styles?.profileView} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text numberOfLines={1} style={styles?.nameStyle}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(0.5),
          }}>
          <Text style={styles?.statuStyle}>
            {online ? 'online' : 'offline'}
          </Text>
          <View
            style={[
              styles?.statuuDot,
              {
                backgroundColor: online
                  ? colors?.themeColor
                  : colors?.chatHeader,
              },
            ]}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '30%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={onVideoPress}>
          <Image
            source={images?.videoCall}
            resizeMode="contain"
            style={styles?.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCallPress}>
          <Image
            source={images?.phone}
            resizeMode="contain"
            style={styles?.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress}>
          <Image
            source={images?.menu}
            resizeMode="contain"
            style={styles?.iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;

const ThemeStyle = color => {
  return StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    backgroundColor: colors?.chatHeader,
    height: Platform?.OS == 'ios' ? hp(8) : hp(10),
  },
  imageView: {
    height: hp(3),
    width: hp(3),
    tintColor: color?.backgroundColor,
  },
  profileView: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(10),
    marginHorizontal: wp(3),
  },
  nameStyle: {
    fontSize: 18,
    color: colors?.white,
    paddingRight: wp(5),
    fontFamily: Roboto?.bold,
  },
  statuStyle: {
    fontSize: 12,
    color: colors?.white,
    fontFamily: Roboto?.medium,
  },
  statuuDot: {
    width: hp(1),
    height: hp(1),
    borderRadius: hp(1),
    marginHorizontal: hp(1),
  },
  iconStyle: {
    width: hp(3),
    height: hp(3),
    tintColor: colors?.backgroundColor,
  },
});
}
