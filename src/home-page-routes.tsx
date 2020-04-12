import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import News from "./screens/News";
import Map from "./screens/Map";
import Screenings from "./screens/Screenings";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const HomePageRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? 'ios-body' : 'ios-body';
          } else if (route.name === "Settings") {
            //iconName = focused ? "ios-list-box" : "ios-list";
            iconName = focused ? "md-settings" : "md-settings";
          } else if (route.name === "News") {
            //iconName = focused ? 'ios-cellular' : 'ios-cellular';
            iconName = focused ? "md-paper" : "md-paper";
          } else if (route.name === "Checks") {
            iconName = focused ? "ios-medkit" : "ios-medkit";
          } else if (route.name === "Map") {
            iconName = focused ? "ios-globe" : "ios-globe";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "mediumturquoise",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Checks" component={Screenings} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
export default HomePageRoutes;
