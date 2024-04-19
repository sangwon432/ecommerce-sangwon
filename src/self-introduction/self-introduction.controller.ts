import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SelfIntroductionService } from './self-introduction.service';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { CreateSelfIntroductionDto } from '@root/self-introduction/dto/create-self-introduction.dto';

@Controller('self-introduction')
export class SelfIntroductionController {
  constructor(
    private readonly selfIntroductionService: SelfIntroductionService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createSelfIntroduction(
    @Req() req: RequestWithUserInterface,
    @Body() createSelfIntroductionDto: CreateSelfIntroductionDto,
  ) {
    return await this.selfIntroductionService.createSelfIntroduction(
      req.user,
      createSelfIntroductionDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async updateSelfIntroduction(
    @Req() req: RequestWithUserInterface,
    @Body() updateSelfIntroductionDto: CreateSelfIntroductionDto,
  ) {
    return await this.selfIntroductionService.updateSelfIntroduction(
      req.user,
      updateSelfIntroductionDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getSelfIntroductionInfo(@Req() req: RequestWithUserInterface) {
    return req.user.selfIntroduction;
  }
}
