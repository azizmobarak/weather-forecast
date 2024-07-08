export const mapWeatherIcon = (weather: string) => {
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
