import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Roboto, colors, hp, images, wp} from '../../helper';

const ChatCard = ({profileImage,messageCount,subText,userName,timeOfMsg,panddingMessage,onPress}) => {
  return(
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles?.container}>
    <TouchableOpacity>
    <Image
    source={profileImage}
    style={{height:hp(6.5), width:hp(6.5)}}
    />
    </TouchableOpacity>
    <View style={{flex:1}}>
    <Text style={[styles?.userNameStyle,{color:colors?.black}]}>{userName}</Text>
    <Text style={[styles?.userNameStyle,{color:colors?.grey}]}>{subText}</Text>
    </View>
    <View style={styles?.bottomView}>
        <Text style={[styles?.boxView,{color:panddingMessage ?colors?.chatHeader: colors?.grey }]}>{timeOfMsg}</Text>
        {panddingMessage ? <View style={styles?.messageView}>
            <Text style={styles?.messageCountStyle}>{messageCount}</Text>
        </View>:null}
    </View>
    
    
  </TouchableOpacity>);
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    height: hp(9),
    width: '97.5%',
    backgroundColor: colors?.white,
    flexDirection:'row',
    alignSelf: 'center',
    marginTop: hp(0.5),
    borderRadius: wp(1),
    alignItems:'center', paddingHorizontal: wp(2.5)
  },
  boxView:{fontSize:12,fontFamily:Roboto?.regular, bottom:hp(0.7)},
  userNameStyle:{fontSize: 15, fontFamily:Roboto?.bold, marginHorizontal:wp(5.06)},
  messageCountStyle:{fontSize:12, fontFamily:Roboto?.bold, color:colors?.white},
  messageView:{height:hp(2.7), width: hp(2.7), backgroundColor: colors?.chatHeader, borderRadius:hp(1.5), alignItems:'center', justifyContent:'center'},
  bottomView:{width: wp(20),  alignItems:'flex-end'}
});
