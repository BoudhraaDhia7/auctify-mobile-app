
import * as React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';


import Main from '../screens/main';
import Login from '../screens/login';
import Transactions from '../screens/transactions';
import Profil from '../screens/profil';
import Home from '../screens/home';
import Favourite from '../screens/favourite';
import Saved from '../screens/saved';
import Settings from '../screens/settings';
import Cart from '../screens/cart';
import Auction from '../screens/auction';

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
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{ headerShown: false }}
        />

        

        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Saved"
          component={Saved}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Auction"
          component={Auction}
          options={{ headerShown: false }}
        />


        
        
            
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNav;