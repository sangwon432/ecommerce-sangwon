import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
              private readonly userService: UserService) {
    super({
      clientID: configService.get('KAKAO_AUTH_CLIENTID'),
      callbackURL: configService.get('KAKAO_AUTH_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {

    const { provider, displayName } = profile
    const {kakao_account, properties} = profile._json
    // 바로 윗 줄이 없을 경우 아래와 같이. parsing을 할 때는 json 구조 보고
    // console.log(profile._json.kakao_account.email)
    // console.log(profile._json.properties.profile_image)
    console.log(kakao_account.email)
    console.log(properties.profile_image)

    try {
      const user = await this.userService.getUserByEmail(kakao_account.email)

      if (user.provider !== provider) {
        throw new HttpException(
          `You are subscribed to ${user.provider}`,
          HttpStatus.CONFLICT,
        );
      }
      done(null, user);
    } catch (err) {
      if (err.status === 404) {
        const newUser = await this.userService.createUser({
          email: kakao_account.email,
          username: displayName,
          provider,
          profileImg: properties.profile_image
        });
        done(null, newUser)
      }

    }
    //done(null, profile);
  }
}
