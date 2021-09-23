import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }
}
