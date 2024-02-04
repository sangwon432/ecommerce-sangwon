import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BaseAPIDoc } from './config/swagger.document';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  // validator
  app.useGlobalPipes(new ValidationPipe());

  // api doc setting with swagger
  const config = new BaseAPIDoc().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get('SERVER_PORT') ?? 8000);
}
bootstrap();
