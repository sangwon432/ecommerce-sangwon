import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from '@root/education/entities/education.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), UserModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
