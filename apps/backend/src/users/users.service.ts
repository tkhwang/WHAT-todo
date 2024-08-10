import { Injectable } from '@nestjs/common';
import { FirebaseUserRepository } from 'src/firebase/firebaseUser.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseUserRepository: FirebaseUserRepository,
  ) {}

  async createUser(uid: string, email: string, id: string, name: string) {
    return this.firebaseUserRepository.createUser(uid, email, id, name);
  }

  async findById(id: string) {
    return this.firebaseUserRepository.findUserById(id);
  }
}
