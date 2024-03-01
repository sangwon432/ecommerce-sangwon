import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { exBufferedFile } from './file.model';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket: string;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('MinioStorageService');
    this.baseBucket = this.configService.get<string>('MINIO_BUCKET');
  }

  public async uploadProfileImg(
    userId: string,
    file: exBufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    if (
      !(
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png')
      )
    ) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    const fileBuffer = file.buffer;

    const userFolderPath = `profile/${userId}/`; // 사용자 폴더 경로
    const filePath = `${userFolderPath}${filename}`; // 파일 경로

    // 기존 파일 삭제 로직 시작
    const stream = this.client.listObjects(baseBucket, userFolderPath, true);
    stream.on('data', (obj) => {
      this.client.removeObject(baseBucket, obj.name, function (err) {
        if (err) {
          console.log('Error removing object:', err);
        }
      });
    });
    stream.on('error', function (err) {
      console.log('Error listing objects:', err);
    });

    this.client.putObject(
      baseBucket,
      filePath,
      fileBuffer,
      fileBuffer.length, // 파일 사이즈를 나타내는 부분 추가
      metaData,
      function (err) {
        console.log(err);
        if (err)
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
      },
    );
    return {
      url: `http://${this.configService.get(
        'MINIO_ENDPOINT',
      )}:${this.configService.get('MINIO_PORT')}/${this.configService.get(
        'MINIO_BUCKET',
      )}/${filePath}`,
    };
  }

  public async uploadDicomFile(
    file: exBufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    const dcmfileFormat = file.mimetype.includes('dcm');

    if (dcmfileFormat) {
      console.log(dcmfileFormat);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const temp_filename = Date.now().toString();

    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    const filename = hashedFileName + ext;
    // const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    const userFolderPath = `dcm/`; // 사용자 폴더 경로
    const filePath = `${userFolderPath}${filename}`; // 파일 경로

    this.client.putObject(
      baseBucket,
      filePath,
      fileBuffer,
      fileBuffer.length, // 파일 사이즈를 나타내는 부분 추가
      metaData,
      function (err) {
        if (err)
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
      },
    );

    return {
      url: `${this.configService.get(
        'MINIO_ENDPOINT',
      )}:${this.configService.get('MINIO_PORT')}/${this.configService.get(
        'MINIO_BUCKET',
      )}/${filePath}`,
    };
  }

  async delete(objectName: string, baseBucket: string = this.baseBucket) {
    try {
      await this.client.removeObject(baseBucket, objectName);
      // 성공적으로 삭제 완료, 필요한 경우 추가 로직
    } catch (err) {
      // 오류 처리
      throw new HttpException(
        'Oops Something wrong happened',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

// import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { MinioService } from 'nestjs-minio-client';
// import { ConfigService } from '@nestjs/config';
// import { exBufferedFile } from './file.model';
// import * as crypto from 'crypto';
//
// @Injectable()
// export class MinioClientService {
//   private readonly logger: Logger;
//   private readonly baseBucket: string;
//
//   public get client() {
//     return this.minio.client;
//   }
//
//   constructor(
//     private readonly minio: MinioService,
//     private readonly configService: ConfigService,
//   ) {
//     this.logger = new Logger('MinioStorageService');
//     this.baseBucket = this.configService.get<string>('MINIO_BUCKET');
//   }
//
//   // private readonly logger: Logger;
//   // private readonly baseBucket: string;
//   //
//   // public get client() {
//   //   return this.minio.client;
//   // }
//   //
//   // constructor(
//   //   private readonly minio: MinioService,
//   //   private readonly configService: ConfigService,
//   // ) {
//   //   this.logger = new Logger('MinioStorageService');
//   //   this.baseBucket = this.configService.get<string>('MINIO_BUCKET');
//   // }
//
//   public async uploadProfileImg(
//     userId: string,
//     file: exBufferedFile,
//     baseBucket: string = this.baseBucket,
//   ) {
//     if (
//       !(
//         file.mimetype.includes('jpg') ||
//         file.mimetype.includes('jpeg') ||
//         file.mimetype.includes('png')
//       )
//     ) {
//       throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
//     }
//     // if (
//     //   !(
//     //     file.mimeType.includes('jpg') ||
//     //     file.mimeType.includes('jpeg') ||
//     //     file.mimeType.includes('png')
//     //   )
//     // ) {
//     //   throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
//     // }
//
//     const temp_filename = Date.now().toString();
//     const hasHasedFileName = crypto
//       .createHash('md5')
//       .update(temp_filename)
//       .digest('hex');
//
//     const ext = file.originalname.substring(
//       file.originalname.lastIndexOf('.'),
//       file.originalname.length,
//     );
//
//     const metaData = {
//       'Content-Type': file.mimetype,
//       'X-Amz-Meta-Testing': 1234,
//     };
//
//     const filename = hasHasedFileName + ext;
//     const fileBuffer = file.buffer;
//
//     const userFolderPath = `profile/${userId}`;
//     const filePath = `${userFolderPath}${filename}`;
//
//     // const temp_filename = Date.now().toString();
//     // const hasHashedFileName = crypto
//     //   .createHash('md5')
//     //   .update(temp_filename)
//     //   .digest('hex');
//     //
//     // const ext = file.originalname.substring(
//     //   file.originalname.lastIndexOf('.'),
//     //   file.originalname.length,
//     // );
//     //
//     // const metaData = {
//     //   'Content-Type': file.mimetype,
//     //   'X-Amz-Meta-Testing': 1234,
//     // };
//     //
//     // const filename = hasHashedFileName + ext;
//     // const fileBuffer = file.buffer;
//     //
//     // const userFolderPath = `profile/${userId}`;
//     // const filePath = `${userFolderPath}${filename}`;
//
//     console.log(filePath);
//
//     this.client.putObject(
//       baseBucket,
//       filePath,
//       fileBuffer,
//       fileBuffer.length,
//       metaData,
//       function (err) {
//         if (err) {
//           throw new HttpException(
//             'Error uploading file',
//             HttpStatus.BAD_REQUEST,
//           );
//         }
//       },
//     );
//
//     // this.client.putObject(
//     //   baseBucket,
//     //   filePath,
//     //   fileBuffer,
//     //   fileBuffer.length,
//     //   metaData,
//     //   function (err) {
//     //     if (err) {
//     //       throw new HttpException(
//     //         'Error uploading file',
//     //         HttpStatus.BAD_REQUEST,
//     //       );
//     //     }
//     //   },
//     // );
//
//     console.log(
//       `http://${this.configService.get(
//         'MINIO_ENDPOINT',
//       )}:${this.configService.get('MINIO_PORT')}/${this.configService.get(
//         'MINIO_BUCKET',
//       )}/${filePath}`,
//     );
//
//     return {
//       url: `http://${this.configService.get(
//         'MINIO_ENDPOINT',
//       )}:${this.configService.get('MINIO_PORT')}/${this.configService.get(
//         'MINIO_BUCKET',
//       )}/${filePath}`,
//     };
//   }
// }
