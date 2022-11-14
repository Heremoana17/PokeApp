import React from 'react';
import {View} from 'react-native';

const TestView = () => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1, backgroundColor: 'red'}}></View>
      <View style={{flex: 1, backgroundColor: 'green'}}></View>
      <View style={{flex: 1, backgroundColor: 'blue'}}></View>
    </View>
  );
};

// const styles = StyleSheet.create({});

export default TestView;
