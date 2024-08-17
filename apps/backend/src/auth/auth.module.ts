import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
