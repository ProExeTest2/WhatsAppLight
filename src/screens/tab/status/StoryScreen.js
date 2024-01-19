import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {Roboto, colors, hp, images} from '../../../helper';
import StatusCard from '../../../components/status/StatusCard';
import {showMessageFunction} from '../../../helper/globalHelper'; 
import { useDispatch, useSelector } from 'react-redux';
import { statusData } from '../../../Redux/action/action';

const StoryScreen = () => {
  const item = [];
  const {navigate} = useNavigation();
  const [status, setStatus] = useState([]);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const [statusVisible, setStatusVisible] = useState(false);
  const color = useSelector(state => state?.data1?.iscolorMode);
  const styles = ThemeStyle(color);

  useEffect(() => {
    firestore()
      ?.collection('Users')
      ?.onSnapshot(query => {
        query?.forEach(documentSnapshot => {
          if (documentSnapshot?.data()?.Uid === auth()?.currentUser?.uid) {
            setUserData(documentSnapshot?.data());
          } else {
            if (item?.includes(documentSnapshot?.data()?.Uid)) {
            } else {
              if (documentSnapshot?.data()?.status?.length !== 0) {
                if (item.length === 0) {
                  item.push(documentSnapshot?.data());
                } else {
                  item.map(a => {
                    if (a?.Uid !== documentSnapshot?.data()?.Uid) {
                      item?.push(documentSnapshot?.data());
                    }
                  });
                }
              }
            }
          }
        });
      });
    setStatus(item);
  }, []);

  const onAddStatus = () => {
    ImagePicker?.openPicker({
      mediaType: 'any',
    }).then(image => {
      storage()
        ?.ref(`/Status/${image?.path?.split('/')?.pop()}`)
        ?.putFile(image?.path)
        ?.then(async () => {
          await storage()
            ?.ref(`/Status/${image?.path?.split('/')?.pop()}`)
            ?.getDownloadURL()
            ?.then(res => {
              const data = {
                statusUrl: res,
                createdAt: firestore?.Timestamp?.fromDate(new Date()),
                viewed: [],
              };
              firestore()
                ?.collection('Users')
                ?.doc(auth()?.currentUser?.uid)
                ?.update({
                  status: firebase?.firestore?.FieldValue?.arrayUnion(data),
                })
                ?.then(() => {
                  showMessageFunction(
                    'Congratulations',
                    'Upload Status Success',
                    'success',
                  );
                })
                ?.catch(err => {
                  showMessageFunction(
                    'Sorry',
                    'Upload Status Failed',
                    'Failed',
                  );
                });
            });
        });
    });
  };

  return (
    <View style={styles?.container}>
      <View>
        <StatusCard
          user={true}
          isStatus={userData?.status?.length == 0 ? false : true}
          onMainPress={onAddStatus}
        />
        <Text style={styles?.listStyle}>Recent Updates</Text>
        <FlatList
          data={status}
          renderItem={({index, item}) => {
            return (
              <StatusCard
                userName={item?.UserName}
                isStatus={item?.status?.length == 0 ? false : true}
                addtionalStyle={{
                  marginBottom: index + 1 === status?.length && hp(1.5),
                }}
                onMainPress={()=>{
                  navigate('StatusShow')
                  dispatch(statusData(item?.status))
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles?.bottomButton}>
        <TouchableOpacity
          style={[styles?.iconStyle, {backgroundColor: color?.tabColor}]}>
          <Image style={styles?.icon} source={images?.pen} tintColor={color?.fontColor}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles?.iconStyle, {backgroundColor: colors?.chatHeader}]}>
          <Image
            style={styles.icon}
            source={images?.camera}
            tintColor={colors?.backgroundColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryScreen;


const ThemeStyle = color => {
  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color?.backgroundColor,
  },
  listStyle: {
    fontSize: 15,
    marginTop: hp(1),
    marginHorizontal: hp(1),
    fontFamily: Roboto?.bold,
    color: color?.fontColor,
  },
  iconStyle: {
    width: hp(6),
    elevation: 3,
    height: hp(6),
    marginRight: hp(2),
    borderRadius: hp(5),
    alignItems: 'center',
    marginBottom: hp(1.5),
    justifyContent: 'center',
  },
  icon: {
    width: hp(2.5),
    height: hp(2.5),
  },
  bottomButton: {
    right: 0,
    bottom: 0,
    position: 'absolute',
    },
});
}