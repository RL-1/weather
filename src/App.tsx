/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import { MainPage } from './screens/MainPage/MainPage';
import store from './store';


const App = () => {

  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}



export default App;
