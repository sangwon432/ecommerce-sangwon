import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => ({
        endPoint: cfg.get<string>('MINIO_ENDPOINT'),
        port: cfg.get<number>('MINIO_PORT'),
        useSSL: false, // 또는 환경변수에서 받아올 수 있습니다.
        accessKey: cfg.get<string>('MINIO_ACCESSKEY'),
        secretKey: cfg.get<string>('MINIO_SECRETKEY'),
      }),
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],

  // imports: [
  //   ConfigModule,
  //   MinioModule.registerAsync({
  //     imports: [ConfigModule],
  //     inject: [ConfigService],
  //     useFactory: async (cfg: ConfigService) => ({
  //       endPoint: cfg.get<string>('MINIO_ENDPOINT'),
  //       port: cfg.get<number>('MINIO_PORT'),
  //       useSSL: false,
  //       accessKey: cfg.get<string>('MINIO_ACCESSKEY'),
  //       secretKey: cfg.get<string>('MINIO_SECRETKEY'),
  //     }),
  //   }),
  // ],
  // providers: [MinioClientService],
  // exports: [MinioClientService],
})
export class MinioClientModule {}
