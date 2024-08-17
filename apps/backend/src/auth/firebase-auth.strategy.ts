import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User extends DecodedIdToken {}
  }
}

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  async validate(token: string): Promise<DecodedIdToken> {
    try {
      return await FirebaseAdmin.auth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
