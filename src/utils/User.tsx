import React from "react";
import auth from '@react-native-firebase/auth';

export const UserContext = React.createContext({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const sub = auth().onAuthStateChanged(userAuth => {
      setUser(userAuth);
    });
    return sub;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
