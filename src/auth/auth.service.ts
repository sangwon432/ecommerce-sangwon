import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from '../user/dto/loggedin-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  //회원가입 프로세스
  async createUser(createUserDto: CreateUserDto) {
    //password 암호화
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // const newUser = await this.userService.createUser({
    //   ...createUserDto,
    //   password: hashedPassword,
    // });
    // return newUser;

    // 아래는 패스워드 감추기
    const newUser = await this.userService.createUser(createUserDto);
    newUser.password = undefined;
    return newUser;
  }

  // 로그인 프로세스
  async logInUser(loggedinUserDto: LoggedinUserDto) {
    const user = await this.userService.getUserByEmail(loggedinUserDto.email);
    //getUserByEmail에서 유저가 없으면 미리 exception throw 해서 여기서는 처리할 필요 없음
    const isPasswordMatched = await bcrypt.compare(
      loggedinUserDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new HttpException(
        'password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = undefined;
    return user;
  }

  public generateAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESSTOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESSTOKEN_EXPIRATION_TIME')}`,
    });
    return token;
  }

  async sendEmailTest(email: string) {
    await this.emailService.sendMail({
      to: email,
      subject: 'check email test',
      text: 'The confirmation number is as follows',
    });
    return 'please check your email';
  }
}
