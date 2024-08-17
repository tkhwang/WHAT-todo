import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
