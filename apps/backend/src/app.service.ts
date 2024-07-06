// import { greetingFromModels } from '@expertTodo/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return greetingFromModels;
    return 'Hello World!';
  }
}
