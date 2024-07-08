import { useState } from 'react';
import { httpService } from '../services/httpService';
import { Alert } from 'react-native';

export interface ForecastDataItems {
  temperature: number;
  weatherIcon: string;
  humidity: number;
  dt: string;
}

export interface GroupedForecastItems {
  dayOfWeek: string;
  details: ForecastDataItems[];
}

export const useForecastData = () => {
  const [forecastData, setForecastData] = useState<GroupedForecastItems[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchForecastData = async (city: string) => {
    setIsLoading(true);
    if (!city) return;
    try {
      setIsLoading(true);
      const data = await httpService.get('forecast', city, 'units=metric');
      if(!data){
        setForecastData([]);
      }else {
        setForecastData(data);
      }
    } catch (error) {
      Alert.alert('Network Error please try later or check your connection');
    } finally {
      setIsLoading(false);
    }
  };

  return { forecastData, fetchForecastData, isLoading };
};
