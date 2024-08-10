import { Injectable } from '@nestjs/common';
import { AuthProviders } from '@whatTodo/models';
import { FirebaseUserRepository } from 'src/firebase/firebaseUser.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseUserRepository: FirebaseUserRepository,
  ) {}

  async createUser({
    uid,
    email,
    id,
    name,
    provider,
  }: {
    uid: string;
    email: string;
    id: string;
    name: string;
    provider: AuthProviders;
  }) {
    return this.firebaseUserRepository.createUser({
      uid,
      email,
      id,
      name,
      provider,
    });
  }

  async findById(id: string) {
    return this.firebaseUserRepository.findUserById(id);
  }
}
