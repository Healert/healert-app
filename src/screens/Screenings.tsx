import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { UserContext } from '../utils/User';

const Screenings = () => {
  const user = React.useContext(UserContext);
  return (
    <SafeAreaView>
      <Text>Screenings Page</Text>
    </SafeAreaView>
  );
};

export default Screenings;
