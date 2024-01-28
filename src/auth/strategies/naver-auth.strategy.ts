import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class NaverAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('NAVER_AUTH_CLIENTID'),
      clientSecret: configService.get('NAVER_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('NAVER_AUTH_CALLBACK_URL'),
      scope: ['email', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    done(null, profile);
  }
}
