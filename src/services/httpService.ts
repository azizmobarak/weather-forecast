export const API_KEY = '75520491154ee4f304a3143b4d46db23';
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class HttpService {
  async get(path: string, city: string, query?: string) {
    const response = await fetch(
      `${BASE_URL}/${path}?q=${city}&appid=${API_KEY}&${query}`
    );
    const data = await response.json();
    if (data.cod === '404') {
      return null;
    }
    return data;
  }
}

export const httpService = new HttpService();
