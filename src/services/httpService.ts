import { BASE_URL } from "../config";

class HttpService {
  async get(path: string, city: string) {
    const response = await fetch(`${BASE_URL}/${path}?city=${city}`);
    const result = await response.json();
    if (!result.ok) {
      return null;
    }
    return result.data;
  }
}

export const httpService = new HttpService();
