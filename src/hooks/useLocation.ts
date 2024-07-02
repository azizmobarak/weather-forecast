import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export default function useLocation() {
  const [city, setCity] = useState('');
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      setCity(address[0].city ?? '');
    })();
  }, []);

  return city;
}
