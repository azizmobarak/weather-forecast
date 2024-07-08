import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { httpService } from '../services/httpService';

interface WeatherData {
  name: string;
  dt: number;
  temp: number;
  humidity: number;
  description: string;
  speed: number;
}

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async (city: string | null) => {
    if (!city) return;
    try {
      setIsLoading(true);
      const data = await httpService.get('weather', city);
      setWeather(data);
    } catch (error) {
      Alert.alert('Network Error please try later or check your connection');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, weather, fetchWeather };
};
