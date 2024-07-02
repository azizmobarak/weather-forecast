import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Example icon library
import { useRoute, RouteProp } from '@react-navigation/native';
import {
  ForecastDataItems,
  GroupedForecastItems,
  useForecastData,
} from '../hooks/useForecastData';
import DataNotFound from '../components/DataNotFound';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Forecast: { city: string };
};

type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;

const Forecast: React.FC = () => {
  const { params } = useRoute<ForecastScreenRouteProp>();
  const { city } = params;
  const { forecastData, fetchForecastData, isLoading } = useForecastData();
  const { goBack } = useNavigation();

  useEffect(() => {
    fetchForecastData(city);
  }, []);

  const kelvinToCelsius = (temperature: number) => {
    return `${Math.round(temperature - 273.15)}°C`;
  };

  const renderItem = ({ item }: { item: GroupedForecastItems }) => {
    return (
      <View className="border-b border-gray-300 p-4">
        <Text className="font-bold text-lg text-black mb-2">
          {item.dayOfWeek}
        </Text>
        {item.details.map((detail: ForecastDataItems, index: number) => (
          <View key={index} className="flex-row items-center justify-between">
            <Text className="text-lg">{detail.dt}</Text>
            <Icon name={detail.weatherIcon} size={30} color="brown" />
            <Text className="text-lg">
              {kelvinToCelsius(detail.temperature)}
            </Text>
            <Text className="text-lg">{detail.humidity}%</Text>
          </View>
        ))}
      </View>
    );
  };

  if (isLoading)
    return (
      <View className="flex h-full justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  if (forecastData.length === 0) {
    return (
      <View className="flex h-full items-center justify-center">
        <DataNotFound />
        <Button title="Back home" onPress={goBack} />
      </View>
    );
  }

  return (
    <View className="flex-1 p-10">
      <Text className="text-2xl font-bold mb-4">Forecast for {city}</Text>
      <FlatList
        data={forecastData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Forecast;
