import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailDto } from '../user/dto/email.dto';
import { UserService } from '../user/user.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ChangePasswordDto } from '../user/dto/change-password.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // 회원가입 api

  @Post('/signup')
  @ApiOperation({
    summary: '이메일 회원 가입',
    description: '회원가입 API',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.authService.createUser(createUserDto);
  }

  // 로그인 api

  // 로그인 요청이 들어오면 -> *패스포트 (local strategy)* -> authservice -> user table 검색을 통해서 결과값을 던져줌
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoggedinUserDto })
  @ApiOperation({
    summary: 'sign in',
    description: 'sign in API',
  })
  async loggedInUser(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    const { cookie, token: accessToken } =
      await this.authService.generateAccessToken(user.id);
    const { cookie: refreshCookie, token: refreshToken } =
      await this.authService.generateRefreshToken(user.id);

    await this.userService.setCurrentRefreshTokenToRedis(refreshToken, user.id);
    //return { user, accessToken, refreshToken };
    req.res.setHeader('Set-Cookie', [cookie, refreshCookie]); // Header (쿠키에) 세팅
    return { user, accessToken };
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'profile 가져오기 with token',
    description: 'profile 정보 가져오는 API',
  })
  async getUserInfo(@Req() req: RequestWithUserInterface) {
    return await req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Req() req: RequestWithUserInterface) {
    const { cookie } = await this.authService.generateAccessToken(req.user.id);
    req.res.setHeader('Set-Cookie', cookie);
    return req.user;
  }

  @HttpCode(200)
  @Post('/email/send')
  @ApiBody({ type: EmailDto })
  @ApiOperation({
    summary: '이메일 verification 보내기',
    description: '이메일 verification API',
  })
  async sendEmailTest(@Body('email') email: string) {
    return await this.authService.initEmailVerification(email);
  }

  @HttpCode(200)
  @Post('/forgot/password')
  async forgotPassword(@Body('email') email: string): Promise<string> {
    return await this.authService.forgotPasswordwithSendEmail(email);
  }

  @Post('/email/check')
  @ApiOperation({
    summary: 'email verification 코드 체크',
    description: 'email verification 코드 체크 api',
  })
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
    // return req.user;
    const { user } = req;
    // const accessCookie = await this.authService.generateAccessToken(user.id);
    // const { cookie: refreshCookie, token: refreshToken } =
    //   await this.authService.generateRefreshToken(user.id);
    // await this.userService.setCurrentRefreshTokenToRedis(refreshToken, user.id);
    // req.res.setHeader('Set-Cookie', [accessCookie, refreshCookie]);
    // return user;
    // const token = await this.authService.generateAccessToken(user.id);
    // return { user, token };
  }

  // @Get('/naver')
  // @UseGuards(NaverAuthGuard)
  // async naverLogin() {
  //   return HttpStatus.OK;
  // }
  //
  // @Get('/naver/callback')
  // @UseGuards(NaverAuthGuard)
  // async naverLoginCallback(@Req() req: RequestWithUserInterface) {
  //   return req.user;
  // }

  @Get('/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @ApiBearerAuth()
  async logout(@Req() req: RequestWithUserInterface) {
    //redis에 refresh token 삭제
    await this.userService.removeRefreshTokenFromRedis(req.user.id);
    // header에 쿠키 부분 삭제하는 로직
    req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
    return true;
  }

  /////////////////////////
  /////////////////////////
  /////////////////////////
  // @UseGuards(AccessTokenGuard)
  // @Post('/change-password')
  // @ApiBearerAuth()
  // @ApiOperation({
  //   summary: 'Change user password',
  //   description: 'Allows a user to change their password.',
  // })
  // async changePassword(
  //   @Req() req: RequestWithUserInterface,
  //   @Body() changePasswordDto: ChangePasswordDto,
  // ) {
  //   return this.authService.changeUserPassword(req.user.id, changePasswordDto);
  // }

  @Post('/change/password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    console.log(changePasswordDto);
    return await this.authService.changePassword(changePasswordDto);
  }
}
