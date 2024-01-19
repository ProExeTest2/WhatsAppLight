import {Animated, StyleSheet, Text, View, Easing, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, hp, wp} from '../../../helper';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';


const StatusShow = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setduration] = useState(1);
  const status = useSelector(state => state?.data?.statusData);
  const [activeSlide, setActiveSlide] = useState();
  // const { entries, activeSlide } = this.state;
  // useEffect(() => {
  //   firestore()
  //     .collection('Users')
  //     ?.doc(auth().currentUser?.uid)
  //     .onSnapshot(querty => {
  //        querty?.docs?.map((obj)=>{
  //          console.log('obj', obj);
  //        }
  //       );
  //     });
  // }, []);
  console.log('activeSlide', activeSlide)

  const onProgress = progress => {
    const time = progress?.currentTime;
    setCurrentTime(time);
    // setCurrent(progress?.playableDuration)
  };
  console.log(currentTime);


  // console.log('index', ac  tiveSlide)
  const renderItem = () => {
    return <Progress.Bar progress={currentTime / duration} color={'green'} />;
  };

  return (
    <View style={styles?.container}>
          {/* <Carousel
              data={[0,1,2,3]}
              layout={'default'}
              renderItem={()=>{
                return (
                  <View style={{height: hp(20), width: hp(20), backgroundColor:'red'}}>
                      {/* <Text style={styles.title}>hii</Text> */}
                  {/* </View>
              );
              }}
              sliderWidth={0}
              itemWidth={0}
            />   */} 
      {/* <ProgressBar progress={currentTime/duration}  color={MD3Colors.error50}/> */}
      {/* <ProgressBar progress={currentTime/duration}  color={MD3Colors.error50}/> */}
      {/* <FlatList
       style={{heightL:hp(1)}}
       contentContainerStyle={{height:hp(1)}}
       data={[0]}
       horizontal={true}
       renderItem={renderItem}
       /> */}
      {/* </View> */}
      {/* <Progress.Bar style={{width:'100%'}} progress={currentTime/duration}  color={'green'}/> */}
      
      <Carousel
        // ref={(c) => { this._carousel = c; }}
        data={status}
        renderItem={({item,index}) => {
          console.log('item', item)
          return (
            <View style={{flex:1,backgroundColor:colors?.black,}}>
               <View style={{width:wp((currentTime*100/duration).toFixed(100)),height:hp(0.5), backgroundColor:'green'}}/>
              <Video
                source={{
                  uri: item?.statusUrl  
                }} 
                style={styles.backgroundVideo}
                resizeMode="contain"
                onProgress={onProgress}
                onLoad={data => {
                  setActiveSlide(index)
                  setduration(data.duration)}}
              />
            </View>
          );
        }}
        sliderWidth={wp(100)}
        itemWidth={hp(50)}
      />
<View style={{width: wp(20)}}>
      <Pagination
              dotsLength={status?.length}
              activeDotIndex={activeSlide}
              containerStyle={{width: wp(100),  justifyContent:'space-around', backgroundColor:colors?.black}}
              dotStyle={{
                  width:wp(100)/status.length,
                  // height: 10,
                  borderRadius: 5,
                  // marginHorizontal: 8,
                  backgroundColor: colors?.chatHeader,
              }}
              inactiveDotStyle={{
                backgroundColor:colors?.grey,
                width:wp(100)/status?.length
              }}
              inactiveDotOpacity={0.4}
              // inactiveDotScale={0.6}
              // renderDots={(active,total,context)=>{
              //   return(
              //     <View style={{width:wp((currentTime*100/duration).toFixed(40)),height:hp(0.5), backgroundColor:'green'}}/>
              //   )
              // }}

            />
        </View>
    </View>
  );
};

export default StatusShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors?.black
  },
  backgroundVideo: {
    // backgroundColor: colors?.black,

    width: wp(95),
    height:hp(100),
    alignSelf:'center'
    // flex:1,
    // alignItems:'center'
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  progressBar: {
    // height: '100%',
    height: hp(1),
    backgroundColor: '#4caf50',
  },
});
// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Animated, Easing } from 'react-native';

// const StatusShow = () => {
//   const [progress, setProgress] = useState(new Animated.Value(0));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       Animated.timing(progress, {
//         toValue: progress._value + 1,
//         duration: 1000,
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [progress]);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.progressBar,
//           {
//             width: progress.interpolate({
//               inputRange: [0, 1],
//               outputRange: ['0%', '100%'],
//             }),
//           },
//         ]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '80%',
//     height: 20,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//     overflow: 'hidden',
//     marginVertical: 20,
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: '#4caf50',
//   },
// });

// export default StatusShow;
