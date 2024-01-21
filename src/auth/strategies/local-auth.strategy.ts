// user table에 유저가 있는지 하고 login 함수의 유효성 여부를 판단하는 함수
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', //email을 verification에 사용
    });
  }

  async validate(email: string, password: string) {
    return await this.authService.logInUser({ email, password });
  }
}
