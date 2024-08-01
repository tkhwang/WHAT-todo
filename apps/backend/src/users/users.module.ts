import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseAdmin } from 'config/firebase.setup';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FirebaseAdmin],
})
export class UsersModule {}
