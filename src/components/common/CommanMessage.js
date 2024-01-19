import React from "react";
import FlashMessage from "react-native-flash-message";
import { commonStyles } from "../../utils";
import { colors } from "../../helper";

const CommanMessage = ({

}) => {
  return (
    <FlashMessage
        autoHide
        duration={1000}
        hideOnPress={true}
      />
  );
};

export default CommanMessage;