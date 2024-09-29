import { Injectable } from '@nestjs/common';
import { AuthProviders } from '@whatTodo/models';
import { FirestoreUserRepository } from 'src/firebase/firestore-user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseUserRepository: FirestoreUserRepository,
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

  async findUserByText(searchText: string) {
    return this.firebaseUserRepository.findUserByText(searchText);
  }
}
