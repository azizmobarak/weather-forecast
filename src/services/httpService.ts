<<<<<<< HEAD
export const API_KEY = '75520491154ee4f304a3143b4d46db23';
export const BASE_URL = 'http://192.168.0.186:3000';
=======
export const API_KEY = process.env.TOKEN;
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';
>>>>>>> 8641271d3a63196b58fbc39085975fcf0a2a474c

class HttpService {
  async get(path: string, city: string, query?: string) {
    console.log(`${BASE_URL}/${path}?city=${city}`);
    const response = await fetch(`${BASE_URL}/${path}?city=${city}`);
    const result = await response.json();
    if (!result.ok) {
      return null;
    }
    return result.data;
  }
}

export const httpService = new HttpService();
