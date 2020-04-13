import React from "react";
import {
  Platform,
  AsyncStorage,
  NativeModules,
  DeviceEventEmitter,
  ToastAndroid
} from "react-native";
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
type LocationCoordinates = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

const App = () => {
  const [firstLaunch, setFirstLaunch] = React.useState<boolean>();
  const startLocationService = NativeModules.GeoLocation.getLocation()
    .then((as: LocationCoordinates) => {
      console.log(as);
      ToastAndroid.show(as.latitude.toString(), 6);
    }, 10)
    .catch(e => console.log(e));
  //Initialize authentication mechanism and url to post data
  NativeModules.GeoLocation.startService("sss", "ssss", "sss", "sss")
    .then(status => {
      if (status.status === "success") {
        startLocationService;
      }
    })
    .catch(e => console.log(e));

  DeviceEventEmitter.addListener("testEvent", (e: LocationCoordinates) => {
    console.log(e);
  });
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
