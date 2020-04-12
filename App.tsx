import React from "react";
import { Platform, AsyncStorage } from "react-native";
import AppRoutes from "./src/Routes";
import IntroSlider from "./src/screens/intro/Intro";
import UserProvider from "./src/utils/User";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\nCmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\nShake or press menu button for dev menu"
});

const firebaseCredentials = Platform.select({
  ios: "https://invertase.link/firebase-ios",
  android: "https://invertase.link/firebase-android"
});

type Props = {};

const App = () => {
  const [firstLaunch, setFirstLaunch] = React.useState<boolean>();

  React.useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then(value => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true"); // No need to wait for `setItem` to finish, although you might want to handle errors
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  return (
    <UserProvider>
      {firstLaunch ? (
        <IntroSlider _onDone={() => setFirstLaunch(false)} />
      ) : (
        <AppRoutes />
      )}
    </UserProvider>
  );
};

export default App;
