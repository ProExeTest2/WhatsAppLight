import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import InputView from '../../../components/chat/InputView';
import ChatHeader from '../../../components/chat/ChatHeader';

import {chat} from '../../../Redux/action/action';
import {Roboto, colors, hp, images, wp} from '../../../helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const ChatData = () => {
  const {navigate, goBack} = useNavigation();
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState([]);
  const data = useSelector(state => state?.data?.chatData);
  const activeUserData = useSelector(state => state?.data?.activeUserData);

  useEffect(() => {
    const docId =
      activeUserData?.Uid > data?.Uid
        ? activeUserData?.Uid + '_' + data?.Uid
        : data?.Uid + '_' + activeUserData?.Uid;

    firestore()
      .collection('chats')
      .doc(docId)
      .onSnapshot(query => {
        // console.log('Allmessages', query?._data?.chat);
        if (query?._data?.chat) {
          chat(query?._data?.chat);
          setMessages(query?._data?.chat);
        }
      });
  }, []);


  const onSendPress = () => {
    const msg = {
      message: chatText,
      sendBy: activeUserData?.Uid,
      createAt: moment(new Date()).format('DD/MM/YYYY'),
    };

    const docId =
      activeUserData?.Uid > data?.Uid
        ? activeUserData?.Uid + '_' + data?.Uid
        : data?.Uid + '_' + activeUserData?.Uid;

    firestore()
      .collection('chats')
      .doc(docId)
      .set({chat: [...messages, msg]})
      .then(() => {
        console.log('Array updated successfully');
      })
      .catch(error => {
        Alert.alert(error);
      });
    setMessages([...messages, msg]);
  };

  return (
    <View style={styles?.container}>
      <SafeAreaView style={{backgroundColor: colors?.chatHeader}} />
      <ChatHeader
        // online={online}
        onVideoPress={() => {
          navigate('VideoCall');
        }}
        title={data?.UserName}
        onBackPress={() => {
          goBack();
        }}
        profileImage={images?.profile1}
      />
      <ImageBackground source={images?.whatsAppBG1} style={{flex: 1}}>
        <KeyboardAwareScrollView
          bounces={false}
          extraScrollHeight={hp(4)}
          contentContainerStyle={{flex: 1}}>
          <FlatList
            bounces={false}
            data={messages}
            style={{flex: 1}}
            renderItem={item => {
              return (
                <View>
                  <Text
                    style={[
                      {
                        alignSelf:
                          item?.item?.sendBy == activeUserData?.Uid
                            ? 'flex-end'
                            : 'flex-start',
                      },
                      styles?.chatView,
                    ]}>
                    {item?.item?.message}
                  </Text>
                </View>
              );
            }}
          />
          <InputView
            value={chatText}
            onSendPress={onSendPress}
            placeholder={'Message ...'}
            placeholderTextColor={colors?.grey}
            onChangeText={text => setChatText(text)}
          />
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default ChatData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatView: {
    fontSize: 14,
    padding: wp(3),
    maxWidth: '30%',
    color: colors?.black,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1.5),
    borderTopLeftRadius: wp(1),
    fontFamily: Roboto?.medium,
    borderTopRightRadius: wp(1),
    borderBottomLeftRadius: wp(1),
    backgroundColor: colors?.chatColor,
  },
});


// import React, { useState, useEffect } from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import NotifService from '../../../../NotifService';

// const App = () => {
//   const [registerToken, setRegisterToken] = useState(null);
//   const [fcmRegistered, setFcmRegistered] = useState(false);
//   const [notif, setNotif] = useState(null);

//   useEffect(() => {
//     const onRegisterCallback = (token) => {
//       setRegisterToken(token.token);
//       setFcmRegistered(true);
//     };

//     const onNotifCallback = (notification) => {
//       Alert.alert(notification.title, notification.message);
//     };

//     setNotif(new NotifService(onRegisterCallback, onNotifCallback));
//   }, []);

//   const handlePerm = (perms) => {
//     Alert.alert('Permissions', JSON.stringify(perms));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Example app react-native-push-notification
//       </Text>
//       <View style={styles.spacer}></View>
//       <TextInput
//         style={styles.textField}
//         value={registerToken}
//         placeholder="Register token"
//       />
//       <View style={styles.spacer}></View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.localNotif();
//         }}>
//         <Text>Local Notification (now)</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.localNotif('sample.mp3');
//         }}>
//         <Text>Local Notification with sound (now)</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.scheduleNotif();
//         }}>
//         <Text>Schedule Notification in 30s</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.scheduleNotif('sample.mp3');
//         }}>
//         <Text>Schedule Notification with sound in 30s</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.cancelNotif();
//         }}>
//         <Text>Cancel last notification (if any)</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.cancelAll();
//         }}>
//         <Text>Cancel all notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.checkPermission(handlePerm);
//         }}>
//         <Text>Check Permission</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.requestPermissions();
//         }}>
//         <Text>Request Permissions</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.abandonPermissions();
//         }}>
//         <Text>Abandon Permissions</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.getScheduledLocalNotifications((notifs) =>
//             console.log(notifs)
//           );
//         }}>
//         <Text>Console.Log Scheduled Local Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.getDeliveredNotifications((notifs) => console.log(notifs));
//         }}>
//         <Text>Console.Log Delivered Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.createOrUpdateChannel();
//         }}>
//         <Text>Create or update a channel</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => {
//           notif.popInitialNotification();
//         }}>
//         <Text>popInitialNotification</Text>
//       </TouchableOpacity>

//       <View style={styles.spacer}></View>

//       {fcmRegistered && <Text>FCM Configured !</Text>}

//       <View style={styles.spacer}></View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
//   textField: {
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//   },
//   spacer: {
//     height: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });

// export default App;
