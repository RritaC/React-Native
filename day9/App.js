import React from 'react';
import { SafeAreaView } from 'react-native';
import ProfileScreen from './components/ProfileScreen';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileScreen />
    </SafeAreaView>
  );
};

export default App;

