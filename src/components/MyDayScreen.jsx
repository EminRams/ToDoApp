import React from 'react';
import { View, Text, Button } from 'react-native';

const MyDayScreen = ({ navigation }) => {
  return (
    <View>
      <Text>My Day </Text>
      {/* <Button
        title="Go to Other Screen"
        onPress={() => navigation.navigate('Other')}
      /> */}
    </View>
  );
};

export default MyDayScreen;
