import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDoc {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Sangwon ECommerce')
      .setDescription('Sangwon ECommerce API Document')
      .setVersion('1.0')
      .build();
  }
}
