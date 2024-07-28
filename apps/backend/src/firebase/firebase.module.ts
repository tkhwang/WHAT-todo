import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    /*
TYPE=service_account
PROJECT_ID=tkhwang-whattodo-dev-1ffcc
PRIVATE_KEY_ID=874d684877736ce075e7f9d23e067fe0747b92c1
PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDHQzT5EmUP1/wF\n3CcnfA3lrYBPSFLKEgDD9Ct+kUC7h/r7NhDgdLyjQnh0bSmIGaOo5mPSnc/Cp5wM\n89qvSO+CKEL91Kj8AIv+SaSrw9WacGVymNNPlaVh10B0IbcPAZiV5Gwu0ouE9c4b\nJWm7pwBi9AlStnHe8ou+kU7+a+sPZ82xAg86MGTiUVV9fwlJ92pEaJZtM8qM+vYv\nmeKKbA/wDsWNa7EWGBAJEPEqBtqqH6T31QLPt3WIwmPLJhBYve7ZYVOIM2yRqAGy\nH1FEyysEsIRy59TeRqaqKJdgKQci7us0R1uqNd7QYXTexnGzvNFROEEAEbLOkpGf\n57EZ+HvBAgMBAAECgf8NYB3xjK+aTHKyk6+GaYNB7k9XAxFIO8S2cBJ7WES2AQWo\nvEJzOnBGuxtNVxQAFYKcv5bzyPTsnBBCmGywcmQNKXDPBNxt8xS19kkDPqIDwqKg\n33jj8ur34vsLjTfQtdgwo2FBV4/djBuuts12WKs7cnb32cCVImH7pWcNGMWaVzhD\nWcYNcBZMStYg1R8S/bPNVHU8ZLjixZU9Jq00/n0f0rlzzMr5DlWOyQ/2toPLVPva\nJWrsQkeK6T5JIY/VxS+aeCdw3ON6/nox3M6GsRW37sBRnLT587YQ6LYj62a+xfXg\nCU3Fzmyh64Thqd4mJeieOiodplX3iJhtjijg0xcCgYEA9r09L2P9MBhaZu8q+iXs\nwXkj5pMC4CgiJylsYgl8adLTL2ykp55e93xLNLRgiEUEj0xErSc39zPkBAGaiJxa\nKR/rxyQlPr2Y5P1XWbEOP6I3TW+TV3R7HoLj7FLnAMRzkiznneS8qnoy9WwHGfzl\nJAgnNDTgn8mW/mxo21qnijsCgYEAzr3LYkJjTq2S6207j/FcyavRFTF6EPcqbNsY\nak+9sByBqYvVBpQ9u+cegdz3Zqxi/1NhMPRGYL/MyQ7YrkSTScNMeCqQ6mFfUyFo\nrfbyJr5XjwENijU/IfR4/KT8A4XUBUYlzGCltKjeOXySdyAQcm9sGuSyYgp09izw\nARPWtjMCgYBKDx0JV3LMd9LSqKD2umFo5QqAj8nCLGmr5YQRnRVJ0izvRCXb5e5N\nTHJqXGXJISYwOM04R9hFi7658R1IOd3aECm9+Txwq4nz2ZLZagqD0RXWWVIZYu39\nh34QFgYeNdkWnAHdY6W5abpX7dfn1f+VJBlYUzLE40Y+EZ4bkQdOtwKBgQCuT/Zg\n9aq3lr/ugl4bAp2CaLzUSrAqB8wcliqi0HMWPyLQKldFwc2/VaIySnXKewTJVKr4\n1K1WO8FVsI/fd3BcXC9ojjM7ezgdZmjVbQZExm4a4/9fjX+aiH9OPWlDKx5WCAws\nozxz84HTJIZ1rHJRmkKi9jq1US3GtqLxtaFuYwKBgHZRGj9/w0PDoetSYXhDHV7w\nO+l46rBDcvY5VyM7hCRJ7UwA0zWmZ5/oMEv0i4wfH3WuO94OacKVPUpFyryxSqGt\n5YObLXn6aNG2EygXnUbyxlh9pxPRT9lMLL3sR7eH/i+Fz9ny2VgIE8kmt5Q0BMvL\nC21OpBWMcJEw6gONGair\n-----END PRIVATE KEY-----\n
CLIENT_EMAIL=firebase-adminsdk-9c1w0@tkhwang-whattodo-dev-1ffcc.iam.gserviceaccount.com
CLIENT_ID=115526010340079282897
AUTH_URI=https://accounts.google.com/o/oauth2/auth
TOKEN_URI=https://oauth2.googleapis.com/token
AUTH_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9c1w0%40tkhwang-whattodo-dev-1ffcc.iam.gserviceaccount.com
UNIVERSAL_DOMAIN=googleapis.com
*/

    const firebaseConfig = {
      type: configService.get<string>('TYPE'),
      project_id: configService.get<string>('PROJECT_ID'),
      private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
      private_key: configService.get<string>('PRIVATE_KEY'),
      client_email: configService.get<string>('CLIENT_EMAIL'),
      client_id: configService.get<string>('CLIENT_ID'),
      auth_uri: configService.get<string>('AUTH_URI'),
      token_uri: configService.get<string>('TOKEN_URI'),
      auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
      client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
      universe_domain: configService.get<string>('UNIVERSE_DOMAIN'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: ``,
      storageBucket: ``,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [],
  exports: [],
})
export class FirebaseModule {}
