import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import CallScreen from './CallScreen';
import React, {useState} from 'react';
import StoryScreen from './StoryScreen';
import ChatScreen from './chat/ChatScreen';
import auth from '@react-native-firebase/auth';
import {Roboto, colors, hp, images, wp} from '../../helper';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../Redux/action/action';
import { useNavigation } from '@react-navigation/native';



const Index = () => {
  const [tab, setTab] = useState([
    {id: 1, tab: 'Chat'},
    {id: 2, tab: 'Story'},
    {id: 3, tab: 'Call'},
  ]);
  const [selected, setSelected] = useState(tab?.[0]?.tab);
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();



  return (
    <View style={styles?.container}>
      <View style={styles?.headerStyle}>
        <View style={styles?.subHeader}>
          <Text style={styles?.mainFonts}>WhatsApp</Text>
          <View style={styles?.iconView}>
            <Image
              source={images?.camera}
              tintColor={colors?.white}
              style={styles?.cameraImage}
            />
            <Image
              source={images?.Search}
              tintColor={colors?.white}
              style={styles?.cameraImage}
            />
            <TouchableOpacity onPress={()=>{
   Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress:(() =>{
        auth().signOut().then(()=>{
          dispatch(userData(null));
          navigate('SplashScreen')
        }).catch((err)=>{
            console.log('err', err)
        })
        })
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

            }}>
            <Image
              source={images?.menu}
              resizeMode="contain"
              tintColor={colors?.white}
              style={styles?.cameraImage}
              />
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles?.header}>
          <TouchableOpacity style={styles?.cameraView}>
            <Image
              source={images?.camera}
              tintColor={colors?.white}
              style={styles?.cameraImage}
            />
          </TouchableOpacity>

          <FlatList
            data={tab}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles?.mainView}
                  onPress={() => setSelected(item?.tab)}>
                  <Text style={styles?.tabStyle}>{item?.tab}</Text>
                  <View
                    style={[
                      styles?.tab,
                      {
                        backgroundColor:
                          selected == item?.tab
                            ? colors?.white
                            : colors?.chatHeader,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      {selected == 'Chat' ? (
        <ChatScreen />
      ) : selected == 'Story' ? (
        <StoryScreen />
      ) : (
        <CallScreen />
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {flex: 1},
  tabStyle: {
    fontSize: 14,
    fontFamily: Roboto?.medium,
    textAlign: 'center',
    color: colors?.white,
    marginBottom: hp(0.7),
  },
  headerStyle: {
    height: Platform?.OS === 'ios' ? hp(15) : hp(13.17),
    justifyContent: 'center',
    backgroundColor: colors?.chatHeader,
  },
  mainFonts: {
    fontSize: 20,
    color: colors?.white,
    fontFamily: Roboto?.bold,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2.5),
  },
  iconView: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
  },
  cameraView: {padding: hp(1.5)},
  mainView: {bottom: 0, width: wp(29.33)},
  cameraImage: {height: hp(2.2), width: hp(2.2)},
  tab: {height: hp(0.7), borderRadius: hp(1)},
});
