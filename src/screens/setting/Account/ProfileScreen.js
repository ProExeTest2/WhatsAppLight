import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '../../../components/common/CommonHeader';
import {colors, hp, wp, images} from '../../../helper';
import {TextInput} from 'react-native-paper';
import ProfileInput from '../../../components/setting/Account/profileInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CommonButton from '../../../components/common/CommonButton';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {showMessageFunction} from '../../../helper/globalHelper';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const {navigate, goBack} = useNavigation();
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDOB] = useState('');
  const [about, setAbout] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const UserData = useSelector(state => state?.data?.activeUserData);
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);

  useEffect(() => {
    setAbout(UserData?.About);
    setEmail(UserData?.Email);
    setDOB(UserData?.BirthDate);
    setPhone(UserData?.Phonenumber);
    setUserName(UserData?.UserName);
    setUserProfile(UserData?.ProfileImage)
  },[]);

  const onEditProfile=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log('image', image)
      storage()
        ?.ref(`/Status/${image?.path?.split('/')?.pop()}`)
        ?.putFile(image?.path)
        ?.then(async (obj) => {
          console.log('obj', obj)
          await storage()
            ?.ref(`/Status/${image?.path?.split('/')?.pop()}`)
            ?.getDownloadURL()
            ?.then(res => {
              console.log('res', res)
              setUserProfile(res)
            });
        });
    });
  };

  const onUpdateData = () => {
    firestore()
      ?.collection('Users')
      ?.doc(auth().currentUser?.uid)
      ?.set({...UserData, UserName: userName, Email: email, BirthDate: dob, About:about,ProfileImage:userProfile})
      ?.then(() => {
        console.log('res', res)
        showMessageFunction(
          'Congratulations',
          'Upload Status Success',
          'success',
        );
        goBack();
      })
      ?.catch(err => {
        showMessageFunction('Sorry', 'Upload Status Failed', 'Failed');
      });
  };

  return (
    <View
      style={styles?.conatiner}>
      <CommonHeader backPress={goBack} headerText={'Profile'} />
      <KeyboardAwareScrollView
        extraHeight={hp(3)}
        contentContainerStyle={{alignItems: 'center'}}
        style={{width: '100%'}}>
        <TouchableOpacity activeOpacity={0.9}>
          <ImageBackground
          borderRadius={hp(10)}
            source={userProfile == "" ? images?.profile1:{uri:userProfile}}
            style={styles?.profielStyle}>
            <TouchableOpacity onPress={onEditProfile} style={styles?.editView}>
              <Image source={images?.camera} style={styles?.cameraView} />
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
        <ProfileInput
          lable={'Name'}
          value={userName}
          onChangeText={text => setUserName(text)}
          leftIcon={images?.user}
          rightIcon={images?.pen}
        />
        <ProfileInput
          lable={'Email Address'}
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon={images?.email}
          rightIcon={images?.pen}
        />
        <ProfileInput
          lable={'Phone NO'}
          value={phone}
          editable={false}
          onChangeText={text => setPhone(text)}
          leftIcon={images?.phone}
          rightIcon={images?.pen}
        />
        <ProfileInput
          lable={'Date Of Birth'}
          value={dob}
          onChangeText={text => setDOB(text)}
          leftIcon={images?.calendar}
          rightIcon={images?.pen}
          onEditPress={() => {}}
        />
        <ProfileInput
          lable={'About'}
          value={about}
          onChangeText={text => setAbout(text)}
          leftIcon={images?.calendar}
          rightIcon={images?.pen}
          onEditPress={() => {}}
        />

        <CommonButton
          buttonText={'Edit Profile'}
          onPress={onUpdateData}
          additionalStyle={{
            marginTop: hp(8),
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ProfileScreen;

const ThemeStyle = color => {
  return StyleSheet.create({
  conatiner:{
    backgroundColor: color?.backgroundColor,
    flex: 1,
    alignItems: 'center',
  },
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
  cameraView: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: colors?.white,
  },
});
}