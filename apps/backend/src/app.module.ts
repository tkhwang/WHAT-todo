import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { appLoggerMiddleware } from './middleware/appLoggerMiddleware';
import { TasksModule } from './tasks/tasks.module';
import { ListsModule } from './lists/lists.module';
import { StepsModule } from './steps/steps.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    FirebaseModule,
    AuthModule,
    UsersModule,
    TasksModule,
    ListsModule,
    StepsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(appLoggerMiddleware).forRoutes('*');
  }
}
