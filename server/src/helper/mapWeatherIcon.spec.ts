import { mapWeatherIcon } from './getWeatherIcons';

describe('mapWeatherIcon', () => {
  it('should return "weather-sunny" for "Clear"', () => {
    expect(mapWeatherIcon('Clear')).toBe('weather-sunny');
  });

  it('should return "weather-cloudy" for "Clouds"', () => {
    expect(mapWeatherIcon('Clouds')).toBe('weather-cloudy');
  });

  it('should return "weather-rainy" for "Rain"', () => {
    expect(mapWeatherIcon('Rain')).toBe('weather-rainy');
  });

  it('should return "weather-partlycloudy" for unknown weather types', () => {
    expect(mapWeatherIcon('Snow')).toBe('weather-partlycloudy');
    expect(mapWeatherIcon('Fog')).toBe('weather-partlycloudy');
  });
});
