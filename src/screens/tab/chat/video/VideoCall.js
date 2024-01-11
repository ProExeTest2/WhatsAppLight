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

  const connectionData = {
   appId: 'a65518102ac345dc8263fb02c5b46c98',
    channel: 'TestApp',
    token: '007eJxTYMjcYj0numqlpsuc1T2RzzalfL68K+zTwqULHKqnrO6QVmpQYEg0MzU1tDA0MEpMNjYxTUm2MDIzTksyMEo2TTIxS7a02MQ/N7UhkJHBuaiHmZEBAkF8doaQ1OISx4ICBgYA/bYhBQ==', // enter your channel token as a string
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

