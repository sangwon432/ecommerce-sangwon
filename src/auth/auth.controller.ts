import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from '../user/dto/loggedin-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUserInterface } from './interfaces/requestWithUser.interface';

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
}
