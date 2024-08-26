import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthProviders } from '@whatTodo/models';
import * as FirebaseAdmin from 'firebase-admin';
import { FirestoreListRepository } from 'src/firebase/firestore-list.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly firestoreListRepository: FirestoreListRepository,
  ) {}

  async validateToken(token: string) {
    try {
      return await FirebaseAdmin.auth().verifyIdToken(token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

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
    const user = await this.userService.createUser({
      id,
      email,
      whatTodoId,
      name,
      provider,
    });

    const list = await this.firestoreListRepository.addList(user.id);

    return user;
  }
}
