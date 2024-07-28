import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
