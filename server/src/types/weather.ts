export interface WeatherData {
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
