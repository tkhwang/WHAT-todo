import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [FirebaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
