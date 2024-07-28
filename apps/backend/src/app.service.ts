// import { greetingFromModels } from '@whatTodo/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return greetingFromModels;
    return 'Hello WHAT-todo-dev !';
  }
}
