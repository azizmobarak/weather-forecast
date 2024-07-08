import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should return the API key', () => {
    const apiKey = 'test_api_key';
    jest.spyOn(configService, 'get').mockReturnValue(apiKey);
    expect(appService.getApiKey()).toBe(apiKey);
  });

  it('should return the Base URL', () => {
    const baseUrl = 'test_base_url';
    jest.spyOn(configService, 'get').mockReturnValue(baseUrl);
    expect(appService.getBaseUrl()).toBe(baseUrl);
  });
});
