import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {Roboto, colors, hp, images, wp} from '../../helper';
import CommonButton from '../../components/common/CommonButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { userData } from '../../Redux/action/action';

const OtpScreen = () => {
  const data = useSelector(state => state?.data?.phoneNumber);
  const data1 = useSelector(state => state?.data?.phoneNumberData);

  const [otp, setOtp] = useState();
  const phoneNumber = data;
  const [count, setCount] = useState(56);
  const {navigate, goBack} = useNavigation();
  const dispatch =useDispatch();

  useEffect(() => {
    // Start the interval when the component mounts
    const intervalId = setInterval(() => {
      // Decrease the counter every second
      setCount(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: colors?.white}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? hp(7) : hp(3),
        }}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            source={images?.backArrow}
            style={{height: hp(3), width: hp(3), marginHorizontal: wp(5)}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 24, fontFamily:Roboto?.bold, color: colors?.black}}>
          Enter OTP Code
        </Text>
      </View>
      {/* <KeyboardAwareScrollView> */}
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          fontFamily:Roboto?.medium,
          marginTop: hp(25),
        }}>
        Code has been send to {data?.[1]?.number}
      </Text>
      <OTPTextView
        textInputStyle={{
          borderWidth: 1,
          height: hp(5.5),
          width: hp(5.5),
          borderRadius: hp(2),
          borderColor: colors?.black,
        }}
        containerStyle={{width: '88%', alignSelf: 'center', marginTop: hp(6)}}
        offTintColor={colors?.black}
        tintColor={colors?.black}
        defaultValue={otp}
        inputCellLength={1}
        inputCount={6}
        handleTextChange={a => {
          setOtp(a);
        }}
      />
      {count == 0 ? (
        <Text
          style={{
            fontSize: 15,
            color: colors?.themeColor,
            textAlign: 'center',
            marginTop: hp(5),
          }}>
          Resend OTP ?
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 15,
            color: colors?.black,
            textAlign: 'center',
            marginTop: hp(5),
          }}>
          Resend Code in <Text style={{color: colors?.darkColor}}>{count}</Text>{' '}
          s
        </Text>
      )}
      {/* </KeyboardAwareScrollView> */}
      <CommonButton
        edit={!otp ? true : false}
        additionalStyle={{
          opacity: !otp ? 0.5 : 1,
          position: 'absolute',
          backgroundColor: colors?.black,
          borderRadius: hp(11),
          width: '87%',
          height: hp(6),
          marginBottom: hp(4),
          bottom: 0,
        }}
        additionalTextStyle={{color: colors?.white, fontSize: 18}}
        buttonText={'Verify'}
        onPress={() => {
               data1?.[0]?.confirm(otp).then(async(res)=>{
                   dispatch(userData(data1))
                  navigate('index')
                  // const data={
                  //   About:'',
                  //   Age:'20',
                  //   UserName: 'parth Tejani',
                  //   Phonenumber: "+91"+phoneNumber,
                  //   BirthDate: '10/09/2004',
                  //   Email:'khushal@gmail.com',
                  //   Uid: auth().currentUser?.uid,
                  //   friends:[],
                  //   status:[],
                  // };
                  // await firestore().collection('Users').doc(auth().currentUser?.uid).set(data).then(()=>{
                  //   console.log('res', res)
                  // });
              }).catch ((err)=>{
                   console.log('err', err)
            })
          }}
      />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({});
// useEffect(() => {
//   const backAction = () => {
//     // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
//     //   {
//     //     text: 'Cancel',
//     //     onPress: () => null,
//     //     style: 'cancel',
//     //   },
//     //   {text: 'YES', onPress: () => setState(true)},
//     // ]);
//     setState(true)
//     return true;
//   };

//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     backAction,
//   );
//   return () => backHandler.remove();
// }, [state]);