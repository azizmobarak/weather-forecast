import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('weather')
  getWeatherDataByCity(@Query('city') city: string, @Res() res: Response): any {
    return this.appService
      .getWeatherByCity(city)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ ok: false, message: 'NOT FOUND' });
        }
        return res.status(200).json({ ok: true, data });
      })
      .catch(() => {
        return res
          .status(500)
          .json({ ok: false, message: 'INTERNAL SERVER ERROR' });
      });
  }

  @Get('forecast')
  getWeatherForecast(@Query('city') city: string, @Res() res: Response): any {
    return this.appService
      .getWeatherForecastByCity(city)
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({ ok: false, message: 'NOT FOUND' });
        }
        return res.status(200).json({ ok: true, data });
      })
      .catch(() => {
        return res
          .status(500)
          .json({ ok: false, message: 'INTERNAL SERVER ERROR' });
      });
  }
}
