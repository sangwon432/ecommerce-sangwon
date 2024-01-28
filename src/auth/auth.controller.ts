import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from '../user/dto/loggedin-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUserInterface } from './interfaces/requestWithUser.interface';
import { AccessTokenGuard } from './guards/access-token.guard';
import { EmailVerficationDto } from '../user/dto/email-verfication.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입 api
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  // 로그인 api

  // 로그인 요청이 들어오면 -> *패스포트 (local strategy)* -> authservice -> user table 검색을 통해서 결과값을 던져줌
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loggedInUser(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }

  //로그인 요청이 들어오면 ->authservice -> userservice -> user table 검색을 통해서 결과값을 던져줌
  // async loggedInUser(@Body() loggedinUserDto: LoggedinUserDto) {
  //   const user = await this.authService.logInUser(loggedinUserDto);
  //   const token = await this.authService.generateAccessToken(user.id);
  //   return { user, token };
  // }

  // 프로필 정보를 가져오는 API
  // 토큰을 통해 로그인 여부 확인
  @UseGuards(AccessTokenGuard)
  @Get()
  async getUserInfo(@Req() req: RequestWithUserInterface) {
    return await req.user;
  }

  @Post('/email/send')
  async sendEmailTest(@Body('email') email: string) {
    return await this.authService.initEmailVerification(email);
  }

  @Post('/email/check')
  async checkEmail(
    //@Body('email') email: string, @Body('code') code: string
    @Body() emailVerficationDto: EmailVerficationDto,
  ) {
    return await this.authService.confirmEmailVerification(emailVerficationDto);
  }

  // social login 은 요청과 결과값 api 두 개 필요

  //Google Login을 요청하는 api
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return HttpStatus.OK;
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard) // useguard means req is used
  async googleLoginCallback(@Req() req: RequestWithUserInterface) {
    return req.user;
  }
}
