import { useState } from 'react';
import { httpService } from '../services/httpService';
import { Alert } from 'react-native';

export const useForecastData = () => {
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mapWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Clear':
        return 'weather-sunny';
      case 'Clouds':
        return 'weather-cloudy';
      case 'Rain':
        return 'weather-rainy';
      default:
        return 'weather-partlycloudy';
    }
  };

  const fetchForecastData = async (city: string) => {
    setIsLoading(true);
    try {
      const data = await httpService.get('forecast', city);
      const mappedData = data.list.map((item: any) => ({
        dayOfWeek: new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
        }),
        temperature: item.main.temp,
        weatherIcon: mapWeatherIcon(item.weather[0].main),
        humidity: item.main.humidity,
        dt: item.dt_txt.split(' ')[1].substring(0, 5),
      }));

      // Group by dayOfWeek
      const groupedData: any = {};
      mappedData.forEach((item: any) => {
        const { dayOfWeek } = item;
        if (!groupedData[dayOfWeek]) {
          groupedData[dayOfWeek] = [];
        }
        groupedData[dayOfWeek].push(item);
      });

      // Convert grouped data to array
      const groupedArray = Object.keys(groupedData).map((key) => ({
        dayOfWeek: key,
        details: groupedData[key],
      }));

      setForecastData(groupedArray);
    } catch (error) {
      Alert.alert('Network Error please try later or check your connection');
    } finally {
      setIsLoading(false);
    }
  };

  return { forecastData, fetchForecastData, isLoading };
};
