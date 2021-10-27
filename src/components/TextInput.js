import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const TitleInput = () => {
  const [text, onChangeText] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

export default TitleInput;

export const ContentInput = () => {
  return <TextInput style={styles.content} />;
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 260,
    marginLeft: 15,
    borderWidth: 1,
    padding: 10,
  },
  content: {
    textAlignVertical: 'top',
    minHeight: 399,
    // height: 399,
    // width: 330,
    // marginLeft: 24,
    marginHorizontal: 24,
    borderWidth: 0.8,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    padding: 8
  },
});


