import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';
import { GroupedForecastItems } from './types';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getWeatherByCity', () => {
    it('should return weather data by city', async () => {
      const city = 'Dubai';
      const weatherData = {
        name: 'Dubai',
        dt: 1234567890,
        temp: 30,
        humidity: 50,
        description: 'clear sky',
        wind: 5,
      };
      jest.spyOn(appService, 'getWeatherByCity').mockResolvedValue(weatherData);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await appController.getWeatherDataByCity(city, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ok: true, data: weatherData });
    });

    it('should return 404 if weather data not found', async () => {
      const city = 'NonExistentCity';
      jest.spyOn(appService, 'getWeatherByCity').mockResolvedValue(null);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await appController.getWeatherDataByCity(city, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        message: 'NOT FOUND',
      });
    });
  });

  describe('getWeatherForecastByCity', () => {
    it('should return weather data by city', async () => {
      const city = 'Dubai';
      const weatherData: GroupedForecastItems[] = [
        {
          dayOfWeek: 'Monday',
          details: [
            {
              temperature: 22,
              weatherIcon: 'Clear',
              humidity: 22,
              dt: '11123333',
            },
          ],
        },
        {
          dayOfWeek: 'Sunday',
          details: [
            {
              temperature: 22,
              weatherIcon: 'Clouds',
              humidity: 22,
              dt: '11123333',
            },
          ],
        },
      ];
      jest
        .spyOn(appService, 'getWeatherForecastByCity')
        .mockResolvedValue(weatherData);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await appController.getWeatherForecast(city, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ok: true, data: weatherData });
    });

    it('should return 404 if weather data not found', async () => {
      const city = 'NonExistentCity';
      jest.spyOn(appService, 'getWeatherByCity').mockResolvedValue(null);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await appController.getWeatherForecast(city, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        message: 'NOT FOUND',
      });
    });
  });
});
