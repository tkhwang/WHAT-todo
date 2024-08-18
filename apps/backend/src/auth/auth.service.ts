import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor() {}

  async validateToken(token: string) {
    try {
      return await FirebaseAdmin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}