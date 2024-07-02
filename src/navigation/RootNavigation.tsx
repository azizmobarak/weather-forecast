import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import Home from '../screens/Home';
import Forecast from '../screens/Forecast';

enum Screens {
  Home = 'Home',
  Forecast = 'Forecast',
}

type RootNavigationNative = {
  [Screens.Home]: NavigatorScreenParams<undefined>;
  [Screens.Forecast]: NavigatorScreenParams<{ city: string }>;
};

const RootStackNavigation = createNativeStackNavigator<RootNavigationNative>();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function RootNavigation(): React.ReactElement {
  const { Screen, Navigator } = RootStackNavigation;
  return (
    <Navigator screenOptions={options}>
      <Screen name={Screens.Home} component={Home} />
      <Screen name={Screens.Forecast} component={Forecast} />
    </Navigator>
  );
}
