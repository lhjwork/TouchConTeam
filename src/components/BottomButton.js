import React from 'react';
import {Dimensions} from 'react-native';
import Touchable from './Touchable';
import {NormalBoldLabel} from './Label';

const {width} = Dimensions.get('window');

const BottomButton = ({onPress, text, style, disabled}) => {
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      style={{
        paddingVertical: 15,
        borderRadius: 53,
        backgroundColor: '#5F408F',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: width - 48,
        marginBottom: 32,
        ...style,
        // position: 'absolute', width: width-48, bottom: 32,
      }}>
      <NormalBoldLabel
        text={text}
        style={{fontSize: 20, lineHeight: 24, color: '#fff'}}
      />
    </Touchable>
  );
};

export default BottomButton;
