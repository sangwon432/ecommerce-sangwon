import { Module } from '@nestjs/common';
import { SelfIntroductionService } from './self-introduction.service';
import { SelfIntroductionController } from './self-introduction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelfIntroduction } from '@root/self-introduction/entities/self-introduction.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SelfIntroduction]), UserModule],
  controllers: [SelfIntroductionController],
  providers: [SelfIntroductionService],
})
export class SelfIntroductionModule {}
