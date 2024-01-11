import React, { useState } from 'react';
  import { StyleSheet, Text, View, Image } from 'react-native';
  import { colors, hp, images, wp } from '../../helper';
// import { countries } from '../../helper/dummyData';

  const CountryPicker = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    return (
      // <View style={styles.container}>
        {/* {renderLabel()} */}
       

      // </View>
    );
  };

  export default CountryPicker;

  const styles = StyleSheet.create({
    dropdown: {
      height: hp(5),
      width: wp(61.33),
      borderColor: colors?.themeColor,
      borderBottomWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      alignSelf:'center'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      // backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 15,
      textAlign:'center'
    },
    selectedTextStyle: {
      fontSize: 15,
      textAlign:'center'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 15,
      textAlign:'center'
    },
  });