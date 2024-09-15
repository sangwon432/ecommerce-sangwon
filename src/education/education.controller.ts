import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { CreateEducationDto } from '@root/education/dto/create-education.dto';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createEducation(
    @Req() req: RequestWithUserInterface,
    @Body() createEducationDto: CreateEducationDto,
  ) {
    return await this.educationService.createEducation(
      req.user,
      createEducationDto,
    );
  }

  @UseGuards(AccessTokenGuard)
  @Put()
  async updateEducation(
    @Req() req: RequestWithUserInterface,
    @Body() updateEducationDto: CreateEducationDto,
  ) {
    return await this.educationService.updateEducation(
      req.user,
      updateEducationDto,
    );
  }

  async deleteEducation() {}
}
