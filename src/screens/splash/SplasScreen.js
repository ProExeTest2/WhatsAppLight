// ExampleComponent.js
import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import {string, images, colors, hp, wp, Roboto} from '../../helper';
import SpalshBg from '../../components/Splash/spalshBg';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SplasScreen = () => {

  const data = useSelector(state => state?.data?.userData);
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(0));
  const [transformIs, setTransformIs] = useState(false);
  const {navigate} = useNavigation();

  useEffect( () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 2500,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTransformIs(true);
      setTimeout(()=>{
          navigate(data? 'index':'WelcomeScreen')
      },3000)
    });
  }, []);

  const animatedStyle = {
    transform: [{translateY: translateY}],
    opacity: opacity,
  };

  return (
    <View style={{flex: 1, backgroundColor: colors?.backgroundColor}}>
      <View style={styles?.style0}>
        <Image
          source={images?.shape1}
          style={styles?.style1}
        />
        <Image
          source={images?.shape4}
          style={styles?.style5}
        />
      </View>
      <Image
        source={images?.shape3}
        resizeMode="contain"
        style={styles?.style4}
      />
      <Animated.View style={[{width: 200, alignSelf: 'center'}, animatedStyle]}>
        <SpalshBg additionlStyle={{alignSelf: 'center', marginTop: hp(1.47)}} />
        <Text style={styles.text}>{string?.appName}</Text>
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          style={styles?.style3}
          source={images?.shape5}
        />
        <Image
          style={styles?.style2}
          source={images?.shape2}
        />
      </View>
      {transformIs ? (
        <View style={{bottom: 10, alignItems: 'center'}}>
          <LottieView
            loop
            autoPlay
            style={{height: 80, width: 80}}
            source={require('../../Assets/lotties/loading.json')}
          />
          <Text style={[styles?.normalText, {color: colors?.themeColor}]}>
            {string?.loadingText} ...
          </Text>
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={styles?.smallText}>{string?.from}</Text>
          <Text style={styles?.normalText}>{string?.brandName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundColor,
  },
  style1: {
    height: hp(21.37),
    width: wp(20),
  },
  style2: {
    height: hp(7),
    width: hp(7),
    marginTop: hp(4.06),
    marginRight: hp(6.5),
  },
  style3: {
    height: hp(20.37),
    width: wp(21.7),
    marginTop: hp(5),
  },
  style4: {
    height: hp(6.33),
    width: wp(10.92),
    marginLeft: wp(13.09),
  },
  style5: {
    height: hp(10.5),
    width: wp(11.33),
  },
  style0: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(5),
  },
  text: {
    fontSize: 25,
    fontFamily:Roboto?.bold,
    color: colors?.black,
    textAlign: 'center',
    bottom: 30,
  },
  smallText: {
    fontSize: 10,
    color: colors?.black,
  },
  normalText: {
    fontSize: 15,
    color: colors?.black,
  },
});

export default SplasScreen;
// });
// import React from 'react';
// import {View, StyleSheet, Text} from 'react-native';

// const CustomBarChart = ({data, barText}) => {
//   // Assuming data is an array of numbers representing the heights of each bar
//   const maxBarHeight = Math.max(...data);

//   return (
//     <>
//       <View style={styles.chartContainer}>
//         {data.map(item => {
//           return (
//             <Text style={[styles.bar, {width: (item / maxBarHeight) * 500}]}>
//               {item}
//             </Text>
//           );
//         })}
//       </View>
//       <View style={styles.chartContainer}>
//         {data.map((barHeight, index) => (
//           <>
//             <View
//               key={index}
//               style={[styles.bar, {height: (barHeight / maxBarHeight) * 500}]}
//             />
//           </>
//         ))}
//       </View>
//       <View style={styles.chartContainer}>
//         {barText.map(item => {
//           return (
//             <Text
//               style={[
//                 styles.bar,
//                 {width: (barText?.length / maxBarHeight) * 500},
//               ]}>
//               {item}
//             </Text>
//           );
//         })}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   chartContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // alignItems: 'flex-end',
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     borderRadius: 10,
//   },
//   bar: {
//     flex: 1,
//     backgroundColor: 'blue',
//     marginHorizontal: 2,
//     borderRadius: 5,
//     textAlign: 'center',
//   },
// });

// export default CustomBarChart;
