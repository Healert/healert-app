import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { UserContext } from "../utils/User";

const News = () => {
  const user = React.useContext(UserContext);
  return (
    <SafeAreaView>
      <Text>News Page</Text>
    </SafeAreaView>
  );
};

export default News;
