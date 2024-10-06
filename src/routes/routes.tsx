
import * as React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Main from '../screens/main';
import Login from '../screens/login';
import Transactions from '../screens/transactions';
import Profil from '../screens/profil';
import Home from '../screens/home';
import Favourite from '../screens/favourite';
import Saved from '../screens/saved';
import Cart from '../screens/cart';
import Auction from '../screens/auction';
import { useAppSelector } from '../stores/storeHook';

export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  Login: undefined;
  Transactions: undefined;
  Profil: undefined;
  Favourite: undefined;
  Saved: undefined;
  Cart: undefined;
  Auction: { productId: string };
};


const Stack = createNativeStackNavigator();


function StackNav() {
  const profile = useAppSelector((state) => state.profile);
  const isLogin = profile.connexionInfo.isLogin && profile.profileInfo && profile.profileInfo.avatar;
  console.log("isLogin", profile)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <>
            <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
            <Stack.Screen name="Transactions" component={Transactions} options={{ headerShown: false }} />
            <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
            <Stack.Screen name="Favourite" component={Favourite} options={{ headerShown: false }} />
            <Stack.Screen name="Saved" component={Saved} options={{ headerShown: false }} />
            <Stack.Screen name="Auction" component={Auction} options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;