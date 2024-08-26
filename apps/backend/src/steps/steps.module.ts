import { Module } from '@nestjs/common';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';

@Module({
  controllers: [StepsController],
  providers: [StepsService]
})
export class StepsModule {}
