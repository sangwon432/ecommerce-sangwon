import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { exBufferedFile } from '../minio-client/file.model';
import { CreateUserDto } from './dto/create-user.dto';

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

  // 프로필 이미지 변경 API 만들기
  @Post('/profile')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateProfileImg(
    @Req() req: RequestWithUserInterface,
    @UploadedFile() image: exBufferedFile,
  ) {
    // console.log(image);
    return await this.userService.updateProfileImg(req.user.id, image);
  }

  @Put('/profile')
  @UseGuards(AccessTokenGuard)
  async updateProfile(
    @Req() req: RequestWithUserInterface,
    @Body() updateUserDto?: CreateUserDto,
  ) {
    return await this.userService.updateProfile(req.user, updateUserDto);
  }
}
