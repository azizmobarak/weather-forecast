import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import useLocation from '../hooks/useLocation';
import { useFetchData } from '../hooks/useFetchData';
import DataNotFound from '../components/DataNotFound';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const currentCity = useLocation();
  const { isLoading, weather, fetchWeather } = useFetchData();
  const navigation = useNavigation();

  const navigateToForecast = () => {
    navigation.navigate('Forecast', { city: search ?? city });
  };

  const onSearch = () => {
    fetchWeather(search);
  };

  useEffect(() => {
    setCity(currentCity);
    fetchWeather(city);
    setSearch(city);
  }, [currentCity, city]);

  const getDateTime = (dt) => new Date(dt * 1000).toLocaleDateString('en-US');

  if (isLoading)
    return (
      <View className="flex h-full justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Weather View</Text>
      <TextInput
        className="border p-2 w-full mb-4"
        placeholder="Enter city"
        value={search}
        onChangeText={setSearch}
      />
      <View className="flex flex-row justify-around w-full">
        <Button title="Get Weather" onPress={onSearch} />
        <Button
          disabled={!search}
          title="Show Forecast"
          onPress={navigateToForecast}
        />
      </View>
      {weather ? (
        <View className="mt-4 p-4 border rounded w-full">
          <Text className="text-xl font-bold">
            {weather.name} - {getDateTime(weather.dt)}
          </Text>
          <View className="flex flex-row justify-around items-center w-full mb-2">
            <Text className="text-lg w-1/2">
              Temperature: {weather.main.temp}°C
            </Text>
            <Icons name="weather-sunny" size={40} color={'brown'} />
          </View>
          <View className="flex flex-row justify-around items-center w-full mb-2">
            <Text className="text-lg w-1/2">
              Weather: {weather.weather[0].description}
            </Text>
            <Icons name="weather-partly-cloudy" size={40} color={'brown'} />
          </View>
          <View className="flex flex-row justify-around items-center w-full mb-2">
            <Text className="text-lg w-1/2">
              Humidity: {weather.main.humidity}%
            </Text>
            <Icons name="water-outline" size={40} color={'brown'} />
          </View>
          <View className="flex flex-row justify-around items-center w-full mt-2">
            <Text className="text-lg w-1/2">
              Wind Speed: {weather.wind.speed} m/s
            </Text>
            <Icons name="windsock" size={40} color={'brown'} />
          </View>
        </View>
      ) : (
        <DataNotFound />
      )}
    </View>
  );
}
