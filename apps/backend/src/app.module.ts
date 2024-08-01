import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FirebaseAdmin } from 'config/firebase.setup';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    UsersModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAdmin],
})
export class AppModule {}
