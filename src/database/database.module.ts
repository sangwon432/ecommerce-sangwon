import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'rxjs';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   // type: 'postgres',
    //   // host: process.env.DATABASE_HOST,
    //   // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    //   // username: process.env.DATABASE_USERNAME,
    //   // password: process.env.DATABASE_PASSWORD,
    //   // database: process.env.DATABASE_DB,
    // //
    // //   host: 'floppy.db.elephantsql.com',
    // //   port: 5432,
    // //   username: 'kedykupa',
    // //   password: 'vdcjaJrNAmBZ9W6yBD_-9HR2gJgX7MMx',
    // //   database: 'kedykupa',
    // //   entities: [],
    // //   autoLoadEntities: true,
    // //   synchronize: true,
    // // })
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
