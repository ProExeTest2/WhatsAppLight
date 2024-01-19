import { Animated, StyleSheet, Text, View ,Easing, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, hp, wp } from '../../../helper'
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
// import { ProgressBar, MD3Colors } from 'react-native-paper';

const StatusShow = () => {

  const [currentTime,setCurrentTime] = useState(0);
  const [current,setCurrent] = useState(0);
  const [duration,setduration]=useState(1)

  const onProgress = (progress) => {
    const time = progress?.currentTime
    setCurrentTime(time);
    console.log('pal==========>',duration)
    // setCurrent(progress?.playableDuration)
  };
console.log(currentTime)

const renderItem=()=>{
  return(
    <Progress.Bar progress={currentTime/duration}  color={'green'}/>
  )
}

  return (
    <View style={styles?.container}>
      {/* <View style={{width:wp(100), flexDirection:'row'}}> */}
       {/* <ProgressBar progress={currentTime/duration}  color={MD3Colors.error50}/> */}
       {/* <ProgressBar progress={currentTime/duration}  color={MD3Colors.error50}/> */}
       <FlatList
       style={{heightL:hp(1)}}
       contentContainerStyle={{height:hp(1)}}
       data={[0,1,2,3]}
       horizontal={true}
       renderItem={renderItem}
       />
       {/* </View> */}
       {/* <Progress.Bar progress={currentTime/duration}  color={'green'}/> */}
      <Video
       source={{uri:"https://file-examples.com/storage/fe5048eb7365a64ba96daa9/2017/04/file_example_MP4_640_3MG.mp4"}}   // Can be a URL or a local file.
       style={styles.backgroundVideo}
       resizeMode="contain"
       onProgress={onProgress}
       onLoad={data=>setduration(data.duration)}
       />
    </View>
  )
}

export default StatusShow;

const styles = StyleSheet.create({
  container:{
  flex:1,

  },
  backgroundVideo: {
    flex:1,
    backgroundColor: colors?.black
    
    // width: wp(95),
    // height:hp(100),
    // alignSelf:'center'
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
  height:hp(1),
  backgroundColor: '#4caf50',
},
})
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
