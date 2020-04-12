import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './screens/auth/SignIn';
import HomePageRoutes from './home-page-routes';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
const Stack = createStackNavigator();

const AppRoutes = () => {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User>();
  React.useEffect(() => {
    const sub = auth().onAuthStateChanged(userAuth => {
      setUser(userAuth);
    });
    return sub;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen name="Home" component={HomePageRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
