import {FlatList, ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, hp, images, wp} from '../../../helper';
import ChatCard from '../../../components/chat/ChatCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {activeUserData, chatData} from '../../../Redux/action/action';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


const ChatScreen = () => {
  const [arr,setArr] = useState([]);
  const [userData, setUserData] = useState();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const alluser=[];
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);
  // const data = firebase?.auth().
  const user =  firebase.auth().currentUser?.phoneNumber;
  // console.log('user', user)



  useEffect( () => {
     firestore()
      .collection('Users') 
      .onSnapshot((querty)=>{
        const data = querty?.docs?.filter((item)=>
         item?.data()?.Uid !== auth().currentUser?.uid
        )
        setArr(data)
        console.log('item',data)
      })
  }, []);

  return (
    <View style={styles?.container}>
      <FlatList 
        data={arr}
        renderItem={({item,index}) => {
          // console.log('item', )
          return (
            <ChatCard
            subText={'hiii'} 
            addtionalStyle={{marginBottom:index+1 === arr.length && hp(5)}}
            timeOfMsg={'5:23 am'}
            userName={item?._data?.UserName}
            onPress={() => {
              navigate('ChatData');
              dispatch(chatData(item?._data));
            }}
            profileImage={item?._data?.ProfileImage == "" ? images?.profile1:{uri:item?._data?.ProfileImage}}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatScreen;

const ThemeStyle = color => {
  return StyleSheet.create({
  container: {flex: 1, backgroundColor: color?.backgroundColor, },
});
}
