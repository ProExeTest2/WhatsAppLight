import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text} from 'react-native';
import RtcEngine, { createAgoraRtcEngine } from 'react-native-agora';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const VideoCall = () => {
    const [videoCall, setVideoCall] = useState(activeUserData?.Uid && chatData?.Uid ? true :false);
    const activeUserData = useSelector(state => state?.data?.activeUserData);
    const chatData = useSelector(state => state?.data?.chat);
    const {navigate, goBack} = useNavigation();

    const sendPushNotification = async () => {
      // const FIREBASE_API_KEY = 'AIzaSyB0-bQqF3aNRZh4z4ss-sz4uf3Q2nv3eZU';
      const message = {
        registration_ids: [
         data[0].fcmToken,
        ],
        notification: {
          title: 'Video Call',
          body: `${userIdName} is calling you`,
          vibrate: 1,
          sound: 1,
          show_in_foreground: true,
          show_in_background: true,
          priority: 'high',
          content_available: true,
          
        },
        data: {
          title: 'Video Call',
          body: `${userIdName} is calling you`,
        },
      };
  
      let headers = new Headers({
        'Content-Type': 'application/json',
        Authorization:
          'key=AAAAvXymAS0:APA91bGpvbCMeKl1QMverYNjDnaDMUWgwTT6oeCQ0OdMG2YJaOsdilp09QxAO4ouLB7frNHadpqIvJ1sBwBRfoTkhamtCVQgl3NIv5CarRBSMVlQc_6wMA7-vGWEoKiLMxgw11EpCe6M',
      });
  
      let response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers,
        body: JSON.stringify(message),
      });
      response = await response.json();
      // console.log(response.success);
    };

  const connectionData = {
   appId: 'a65518102ac345dc8263fb02c5b46c98',
    channel: 'test',
    token: '007eJxTYJi3wtVycc69XA6L5Z2Wx2sexlx7c8LebWWygvjstGUt66YqMCSamZoaWhgaGCUmG5uYpiRbGJkZpyUZGCWbJpmYJVtanFo5P7UhkJFBTMWQmZEBAkF8FoaS1OISBgYATRUe8g==', // enter your channel token as a string
  };
  const callbacks = {
    EndCall: () =>{ setVideoCall(false); goBack();},
};
const initAgoraEngine = async () => {
    const engine = await createAgoraRtcEngine()
    // Additional Agora configuration
    return engine;
  };
  return (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} settings={{}}/>
  );
};

export default VideoCall;

