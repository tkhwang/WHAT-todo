import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthService } from './auth.service';
import { AppGuard } from './app.guard';

@Module({
  imports: [FirebaseModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AppGuard, FirebaseAuthStrategy, AuthService],
  exports: [AppGuard, AuthService],
})
export class AuthModule {}
