import { Injectable } from '@nestjs/common';
import { AuthProviders } from '@whatTodo/models';
import { FirebaseUserRepository } from 'src/firebase/firebase-user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseUserRepository: FirebaseUserRepository,
  ) {}

  async createUser({
    id,
    email,
    whatTodoId,
    name,
    provider,
  }: {
    id: string;
    email: string;
    whatTodoId: string;
    name: string;
    provider: AuthProviders;
  }) {
    return this.firebaseUserRepository.createUser({
      id,
      email,
      whatTodoId,
      name,
      provider,
    });
  }

  async findById(id: string) {
    return this.firebaseUserRepository.findUserById(id);
  }
}
