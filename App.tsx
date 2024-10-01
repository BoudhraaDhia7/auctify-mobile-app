import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';

import StackNav from './src/routes/routes';

import { store } from './src/stores/store';
import { Provider as ReduxProvider } from 'react-redux';

const App = () => {

  Orientation.lockToPortrait();

  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <StackNav />
      </ReduxProvider>
    </GestureHandlerRootView>
  )

}


export default App;
