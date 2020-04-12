import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { UserContext } from '../utils/User';

const Settings = () => {
  const user = React.useContext(UserContext);
  return (
    <SafeAreaView>
      <Text>Settings Page</Text>
    </SafeAreaView>
  );
};

export default Settings;
