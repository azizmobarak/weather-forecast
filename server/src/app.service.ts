import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface WeatherData {
  name: string;
  dt: number;
  temp: number;
  humidity: number;
  description: string;
  wind: number;
}

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

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getApiKey(): string {
    return this.configService.get<string>('API_KEY');
  }

  getBaseUrl(): string {
    return this.configService.get<string>('BASE_URL');
  }

  async getWeatherByCity(city): Promise<WeatherData> {
    const response = await fetch(
      `${this.getBaseUrl()}/weather?q=${city}&appid=${this.getApiKey()}`,
    );
    const data = await response.json();
    console.log(data);
    if (data.cod === '404') {
      return null;
    }
    console.log(data);
    return {
      name: data.name,
      dt: data.dt,
      temp: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      wind: data.wind.speed,
    };
  }

  async getWeatherForecastByCity(city): Promise<GroupedForecastItems[]> {
    const response = await fetch(
      `${this.getBaseUrl()}/forecast?q=${city}&appid=${this.getApiKey()}`,
    );
    const data = await response.json();
    if (data.cod === '404') {
      return [];
    }

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

    return groupedArray;
  }
}
