import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENTID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    //구글은 인증만 제공하기 때문에 우리쪽 db에 저장하는 프로세스가 필요

    const { provider, displayName, email, picture } = profile;

    try {
      const user = await this.userService.getUserByEmail(email);
      // 유저가 있으면 db에 있는 유저 정보를 넘겨주면 됨

      if (user.provider !== provider) {
        throw new HttpException(
          `You are already subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }
      done(null, user);
    } catch (err) {
      //유저가 없으면 유저를 가입시키면 됨
      if (err.status === 404) {
        //회원가입 프로세스
        const newUser = await this.userService.createUser({
          email,
          username: displayName,
          provider,
          profileImg: picture,
        });
        done(null, newUser);
      }
    }

    // done(null, profile);
  }
}
