import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
