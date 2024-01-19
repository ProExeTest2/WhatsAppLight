import {Image, Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { showMessage } from 'react-native-flash-message';
import { colors, images } from '.';
export const isIOS = Platform.OS === 'ios';
export const fontSize = val => RFValue(val, 812);

export const wp = val => widthPercentageToDP(val);
export const hp = val => heightPercentageToDP(val);
export const statusBarHeight = ((getStatusBarHeight() * 100) / 812).toFixed(2);

export const showMessageFunction = (message, description, type) => {
	return showMessage({
		message: message,
		description: description,
		type: type,
    style:{
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
      backgroundColor: type == 'success' ? colors?.themeColor : 'red'
  }
		// icon: (props) => (
			// <Image source={type == "warning" ? images?.warning : images?.success} {...props} />
		// ),
	});
};