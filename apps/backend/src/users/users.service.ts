import { Injectable } from '@nestjs/common';
import { FirebaseAdmin } from 'config/firebase.setup';
import { SigninOrSignupDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly admin: FirebaseAdmin) {}

  async signinOrSignup(signinOrSignupDto: SigninOrSignupDto) {
    return new Promise((resolve, reject) => {
      resolve({ message: 'Hello World' });
    });
  }
}
