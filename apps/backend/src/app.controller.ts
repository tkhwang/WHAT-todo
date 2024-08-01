import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from 'decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/admin')
  @Auth('ADMIN')
  goodMorning() {
    return 'admin only!';
  }

  @Get('/developer')
  @Auth('DEVELOPER')
  goodAfternoon() {
    return 'developer only!';
  }

  @Get('/all')
  goodEvening() {
    return 'all!';
  }
}
