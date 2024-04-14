import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from '../user/dto/loggedin-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { EmailService } from '../email/email.service';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { EmailVerficationDto } from '../user/dto/email-verfication.dto';
import { Provider } from '../user/entities/provider.enum';
import { ChangePasswordDto } from '../user/dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const newUser = await this.userService.createUser({
      ...createUserDto,
      provider: Provider.LOCAL,
    });
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

  // account token 발급 로직
  public generateAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESSTOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESSTOKEN_EXPIRATION_TIME')}`,
    });
    // return token;
    return `Authentication=${token}; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESSTOKEN_EXPIRATION_TIME',
    )}`;
    // cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
    //   'JWT_ACCESSTOKEN_EXPIRATION_TIME',
    // )}`,
    // token,
    // return {
    //   cookie: `Authentication=${token}; Path=/; Max-Age=${this.configService.get(
    //     'JWT_ACCESSTOKEN_EXPIRATION_TIME',
    //   )}`,
    //   // cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
    //   //   'JWT_ACCESSTOKEN_EXPIRATION_TIME',
    //   // )}`,
    //   // token,
    // };
  }

  //refresh token 발급 로직
  public generateRefreshToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESHTOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESHTOKEN_EXPIRATION_TIME',
      )}`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESHTOKEN_EXPIRATION_TIME',
    )}`; //쿠키 형태
    return { cookie, token };

    // return token;
  }

  async initEmailVerification(email: string) {
    const generateNo = this.generateOTP();
    //자동 생성된 번호를 redis에 저장, 키: 밸류로 저장
    await this.cacheManager.set(email, generateNo); // set으로 데이터 저장

    await this.emailService.sendMail({
      to: email,
      subject: 'check email test',
      text: `The confirmation number is as follows. ${generateNo}`,
    });
    return 'please check your email';
  }

  async confirmEmailVerification(emailVerficationDto: EmailVerficationDto) {
    const { email, code } = emailVerficationDto;
    const codeFromRedis = await this.cacheManager.get(email);
    if (codeFromRedis !== code) {
      throw new BadRequestException('Wrong code provided');
    }
    await this.cacheManager.del(email);
    return 'success';
  }

  generateOTP() {
    let OTP = '';

    for (let i = 1; i <= 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }

  public getCookiesForLogout() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  async forgotPasswordwithSendEmail(email: string): Promise<string> {
    const payload: any = { email };

    const token = await this.jwtService.sign(payload, {
      secret: this.configService.get('FORGOT_PASSWORD_SECRET'),
      expiresIn: this.configService.get('FORGOT_PASSWORD_EXPIRATION_TIME'),
    });
    const url = `${this.configService.get(
      'FRONTEND_DEFAULT_URL',
    )}/change/password?token=${token}`;
    const text = `Please check below link. Click here: ${url}`;

    await this.emailService.sendMail({
      to: email,
      subject: 'forgot password - sangwon service',
      text,
    });
    return 'please check your email';
  }

  ///////////////
  //////////////
  // async changeUserPassword(
  //   userId: string,
  //   changePasswordDto: ChangePasswordDto,
  // ) {
  //   const user = await this.userService.getUserById(userId);
  //
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   const isMatch = await bcrypt.compare(
  //     changePasswordDto.currentPassword,
  //     user.password,
  //   );
  //
  //   if (!isMatch) {
  //     throw new HttpException(
  //       'Current password is incorrect',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //
  //   const hashedNewPassword = await bcrypt.hash(
  //     changePasswordDto.newPassword,
  //     10,
  //   );
  //
  //   // Assuming userService has access to the userRepository or leverages TypeORM's query building features directly.
  //   await this.userService.updatePassword(userId, hashedNewPassword);
  //
  //   return { message: 'Password changed successfully' };
  // }

  public async changePassword(changePasswordDto: ChangePasswordDto) {
    const email = await this.decodedComfirmationToken(changePasswordDto.token);

    await this.userService.changePassword(email, changePasswordDto.password);
  }

  // 토큰에 담겨있는 유저 정보의 이메일 추출
  public async decodedComfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('FORGOT_PASSWORD_SECRET'),
      });
      return payload.email;
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException('token expired error');
      } else {
        throw new BadRequestException('bad confirmation token');
      }
    }
  }
}
