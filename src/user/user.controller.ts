import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 전체 유저 정보를 조회하는 API
  // @Get()
  // @ApiOperation({
  //   summary: '전체 유저 정보 가져오기',
  //   description: '전체 유저 정보 가져오는 API',
  // })
  // @UseGuards(AccessTokenGuard)
  // //조건: 로그인을 해야하고, 허용된 롤을 가진 사람만 접근 가능한 API
  // async getAllUserInfo(@Req() req: RequestWithUserInterface) {
  //   const { user } = req;
  //   if {user.roles.includes(Role.ADMIN)} {
  //     //에러표시
  //   }
  //   return await this.userService.getAllUserInfo();
  // } -> role guard가 없는 경우

  //role guard가 있는 경우 useguard decor 추가
  @Get()
  @ApiOperation({
    summary: '전체 유저 정보 가져오기',
    description: '전체 유저 정보 가져오는 API',
  })
  @UseGuards(RoleGuard(Role.ADMIN))
  @ApiBearerAuth()
  async getAllUserInfo() {
    return await this.userService.getAllUserInfo();
  }
}
