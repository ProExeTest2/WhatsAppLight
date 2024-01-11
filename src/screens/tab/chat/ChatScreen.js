import {FlatList, ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, hp, images, wp} from '../../../helper';
import ChatCard from '../../../components/chat/ChatCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {activeUserData, chatData} from '../../../Redux/action/action';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const ChatScreen = () => {
  const [arr,setArr] = useState();
  const [userData, setUserData] = useState();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const alluser=[];
  // const data = firebase?.auth().
  const user =  firebase.auth().currentUser?.phoneNumber;
  console.log('user', user)



  useEffect( () => {
     firestore()
      .collection('Users') 
      .onSnapshot((querty)=>{
        querty?.docs?.map((item)=>{
          if(item?._data?.Phonenumber === user)
          {
            setUserData(item?._data)
          }else{            
                  alluser.push(item?._data)
                  setArr(alluser)
          }
          // console.log('item',)
        })
      })
      // .then(res => {
      //   // if()
      // res?.docs?.map((item)=>{
      //     if(item?._data?.Phonenumber == user){
      //       
      //     }else{
      //      
      //     }})
      // }).catch((res)=>{
      //    console.log('err=================>', res)
      // });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors?.whatsAppBg}}>
      <FlatList 
        data={arr}
        renderItem={({item}) => {
          return (
            <ChatCard
              profileImage={images?.profile1}
              timeOfMsg={'5:23 am'}
              subText={'hiii'} 
              userName={item?.UserName}
              onPress={() => {
                navigate('ChatData');
                dispatch(chatData(item));
                dispatch(activeUserData(userData));
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
