import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import * as Joi from '@hapi/joi';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { EmailModule } from '@email/email.module';
import { BlogModule } from '@blog/blog.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { RedisModule } from '@redis/redis.module';
import { ProductModule } from '@product/product.module';
import { MinioClientModule } from '@minio-client/minio-client.module';
import { ProfileModule } from './profile/profile.module';
import { EducationModule } from './education/education.module';
import { SelfIntroductionModule } from './self-introduction/self-introduction.module';
import { SmsService } from './sms/sms.service';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_ACCESSTOKEN_SECRET: Joi.string().required(),
        JWT_ACCESSTOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESHTOKEN_SECRET: Joi.string().required(),
        JWT_REFRESHTOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_TTL: Joi.number().required(),

        FORGOT_PASSWORD_SECRET: Joi.string().required(),
        FORGOT_PASSWORD_EXPIRATION_TIME: Joi.string().required(),

        FRONTEND_DEFAULT_URL: Joi.string().required(),

        GOOGLE_AUTH_CLIENTID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_AUTH_CALLBACK_URL: Joi.string().required(),

        NAVER_AUTH_CLIENTID: Joi.string().required(),
        NAVER_AUTH_CLIENT_SECRET: Joi.string().required(),
        NAVER_AUTH_CALLBACK_URL: Joi.string().required(),

        KAKAO_AUTH_CLIENTID: Joi.string().required(),
        KAKAO_AUTH_CALLBACK_URL: Joi.string().required(),

        MINIO_ENDPOINT: Joi.string().required(),
        MINIO_PORT: Joi.number().required(),
        MINIO_ACCESSKEY: Joi.string().required(),
        MINIO_SECRETKEY: Joi.string().required(),
        MINIO_BUCKET: Joi.string().required(),

        SERVER_PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),

        TWILIO_ACCOUNT_SID: Joi.string().required(),
        TWILIO_AUTH_TOKEN: Joi.string().required(),
        TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
      }),
    }),
    ScheduleModule.forRoot(),
    BlogModule,
    UserModule,
    AuthModule,
    EmailModule,
    RedisModule,
    LoggerModule,
    ProductModule,
    MinioClientModule,
    ProfileModule,
    EducationModule,
    SelfIntroductionModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SmsService],
})
export class AppModule {}
