import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Roboto, colors, hp, images, string, wp} from '../../helper';
import {countries} from '../../helper/dummyData';
import {Dropdown} from 'react-native-element-dropdown';
import CommonButton from '../../components/common/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setNumber, setNumberData} from '../../Redux/action/action';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'

const PhoneAuth = () => {
  const [value, setValue] = useState('Select Text');
  const [valueNum, setValueNum] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [uid, setUid]=(uuid.v4())

  return (
    <View style={styles?.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '73%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: hp(11.02),
          marginBottom: hp(4.31),
          left: '5%',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: Roboto?.bold,
            color: colors?.black,
          }}>
          Enter your phone number
        </Text>
        <Image
          resizeMode="contain"
          style={{height: hp(2), width: hp(6.66), alignSelf: 'center'}}
          source={images?.menu}
        />
      </View>
      <Text
        style={{
          fontSize: 13,
          fontFamily: Roboto?.medium,
          color: colors?.black,
          width: '89%',
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {string?.phoneAuth}
        <Text style={{color: colors?.selectText}}>{string?.phoneAuth1}</Text>
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: colors?.chatHeader}]}
        placeholderStyle={styles.placeholderStyle}
        // selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        // containerStyle={{backgroundColor:'red'}}
        data={countries}
        // onChangeText={(item)=>{console.log('item', item)}}
        maxHeight={300}
        valueField="value"
        placeholder={'Select Country'}
        value={value?.name}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Image
            source={images?.downArrow}
            style={{height: hp(2), width: hp(2)}}
          />
        )}
        renderItem={item => {
          return (
            <View style={{height: hp(4), width: wp(50), alignSelf: 'center'}}>
              <Text style={styles?.selectedTextStyle}>{item?.name}</Text>
            </View>
          );
        }}
      />
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <TextInput
          style={{
            height: hp(5),
            width: wp(14.66),
            fontSize:15,
            borderColor: colors?.themeColor,
            borderBottomWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 8,
            // alignSelf:'center'
            textAlign: 'center',
          }}
          placeholder={value?.phoneCode}
          value={value?.phoneCode ? value?.phoneCode : '+00'}
          onChangeText={text => {
            countries?.map(i => {
              if (i?.phoneCode == text) {
                setValue(i);
              }
            });
          }}
        />
        <TextInput
          style={{
            height: hp(5),
            borderRadius: 8,
            width: wp(42.66),
            fontSize:15,
            // textAlign: 'center',
            paddingHorizontal: 8,
            borderBottomWidth: 1,
            borderColor: colors?.themeColor,
          }}
          maxLength={10}
          inputMode='numeric'
          keyboardType="phone-pad"
          placeholder={'Enter Phone Number'}
          value={valueNum}
          onChangeText={text => {
            setValueNum(text);
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: colors?.black,
          textAlign: 'center',
          marginTop: hp(1),
        }}>
        Carrier charges may apply
      </Text>
      <CommonButton
        buttonText={'NEXT'}
        onPress={async() => {
           const arr = await auth().signInWithPhoneNumber(value?.phoneCode+valueNum)
          .then((res) => {
              navigate('OtpScreen'), dispatch(setNumberData([res,{number:value?.phoneCode+valueNum}]));
            })
            .catch(err => {
              console.log('err', err);
            });
        }}
        additionalStyle={{
          height: hp(5),
          width: wp(20),
          position: 'absolute',
          bottom: 0,
          marginBottom: hp(8),
        }}
      />
    </View>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundColor,
  },
  dropdown: {
    height: hp(5),
    width: wp(61.33),
    marginTop: hp(7),
    borderColor: colors?.themeColor,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    // backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color:colors?.black,
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontSize: 15,
    fontFamily:Roboto?.medium,
    color: colors?.black,
    textAlign: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color:colors?.black,
    // textAlign: 'center',
  },
});
