import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';
import CallScreen from './CallScreen';
import React, {useEffect, useState} from 'react';
import StoryScreen from './status/StoryScreen';
import ChatScreen from './chat/ChatScreen';
import auth from '@react-native-firebase/auth';
import {Roboto, colors, hp, images, wp} from '../../helper';
import {useDispatch, useSelector} from 'react-redux';
import {userData} from '../../Redux/action/action';
import {useNavigation} from '@react-navigation/native';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {
  indexMenuCall,
  indexMenuChat,
  indexMenuStory,
  tabData,
} from '../../helper/dummyData';

const Index = () => {
  const [tab, setTab] = useState(tabData);
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();
  const [selected, setSelected] = useState(tab?.[0]?.tab);
  const [menuVisible, setMenuVisible] = useState(false);
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);

  useEffect(() => {
    const backAction = () => {
      BackHandler?.exitApp()
      return true;
    };
   BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);
  
  const renderMenu = () => {
    const listRenderItem = ({item}) => {
      const onOptionPress = () => {
        if (selected == 'Chat') {
          if (item?.optionText == 'New Group') {
          } else if (item?.optionText == 'New broadCast') {
          } else if (item?.optionText == 'Linked device') {
          } else if (item?.optionText == 'Starred messages') {
          } else if (item?.optionText == 'Payments') {
          } else {
            navigate('SettingIndex');
          }
        } else if (selected == 'Story') {
          navigate('SettingIndex');
        } else {
          if (item?.optionText == 'Settings') {
            navigate('SettingIndex');
          } else {
          }
        }
        setMenuVisible(false);
      };
      return (
        <>
          <Text onPress={item => onOptionPress(item)} style={styles?.menuText}>
            {item?.optionText}
          </Text>
        </>
      );
    };

    return (
      <FlatList
        data={
          selected == 'Chat'
            ? indexMenuChat
            : selected == 'Story'
            ? indexMenuStory
            : indexMenuCall
        }
        keyExtractor={item => {
          item?.id;
        }}
        renderItem={item => listRenderItem(item)}
      />
    );
  };

  return (
    <View style={styles?.container}>
      <View style={styles?.headerStyle}>
        <View style={styles?.subHeader}>
          <Text style={styles?.mainFonts}>WhatsAppLight</Text>
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
            <TouchableOpacity
              onPress={() => {
                //  Alert.alert(
                //   'Alert Title',
                //   'My Alert Msg',
                //   [
                //     {
                //       text: 'Cancel',
                //       onPress:(() =>{
                //       auth().signOut().then(()=>{
                //         dispatch(userData(null));
                //         navigate('SplashScreen')
                //       }).catch((err)=>{
                //           console.log('err', err)
                //       })
                //       })
                //     },
                //   ],
                //   {
                //     cancelable: true,
                //     onDismiss: () =>
                //       Alert.alert(
                //         'This alert was dismissed by tapping outside of the alert dialog.',
                //       ),
                //   },
                // );
              }}>
              <Menu
                opened={menuVisible}
                onBackdropPress={() => setMenuVisible(false)}>
                <MenuTrigger text="" onPress={() => setMenuVisible(true)}>
                  <Image
                    source={images?.menu}
                    resizeMode="contain"
                    tintColor={colors?.white}
                    style={styles?.cameraImage}
                  />
                </MenuTrigger>
                <MenuOptions
                  renderOptionsContainer={renderMenu}
                  optionsContainerStyle={styles?.menuContainer}></MenuOptions>
              </Menu>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles?.header}>
          <TouchableOpacity style={styles?.cameraView}>
            <Image
              source={images?.community}
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
                            ? color?.tabColor
                            : color?.chatHeader,
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

const ThemeStyle = color => {
  return StyleSheet.create({
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
      backgroundColor: color?.chatHeader,
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
      marginBottom: hp(2),
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
    menuText: {
      fontSize: 15,
      color: color?.white,
      fontFamily: Roboto?.medium,
      padding: hp(1.5),
      borderRadius: hp(1),
    },
    menuContainer: {
      borderRadius: hp(0.5),
      marginTop: hp(3.5),
      backgroundColor: color?.black,
    },
  });
};
