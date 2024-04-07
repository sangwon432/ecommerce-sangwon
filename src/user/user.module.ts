import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { MinioClientModule } from '@minio-client/minio-client.module';
import { EmailModule } from '@email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MinioClientModule,
    ConfigModule,
    EmailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
