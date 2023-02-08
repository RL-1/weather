import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { RootState } from '../../store';
import { getWeather } from '../../store/mainSlice';
import { Loader } from './components/loader';
import { SelectDate } from './components/selectDate';
import { WeatherView } from './components/weatherView';
import Geolocation from 'react-native-geolocation-service';
import { ChangeTheme } from './components/changeTheme';


export enum themeType{
  LIGHT = 'light',
  DARK = 'dark',
}

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
export const MainPage = () => {

  const dispatch = useAppDispatch()
  const { weatherLocation, day } = useAppSelector((state: RootState) => state.mainSlice)
  const [location, setLocation] = useState<any>()
  const [theme, setTheme] = useState<themeType>(themeType.LIGHT)

  const backgroundStyle = {
    backgroundColor: theme === themeType.DARK ? Colors.darker : Colors.lighter,
    height: '100%',
  };
  const styleScrollView = {
    backgroundColor: theme === themeType.DARK ? Colors.darker : Colors.lighter,
    height: '100%',
    flex: 1,
    padding: 24,
  }
  const handleChangeTheme = () => {
    if(themeType.LIGHT === theme){
        return setTheme(themeType.DARK)
    }
    return setTheme(themeType.LIGHT)
}
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          error => {
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };


  useEffect(() => {
    if(location){
      dispatch(getWeather({
        country: `${location.coords.latitude},${location.coords.longitude}`,
        day: day,
      }))
    } else {
      getLocation()
    }
  }, [day, location])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={theme === themeType.LIGHT ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {weatherLocation.country ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styleScrollView}>
          <ChangeTheme theme={theme} handleChange={handleChangeTheme}/>
          <SelectDate />
          <WeatherView />
        </ScrollView>
      ) : <Loader />}
    </SafeAreaView>
  );
}
