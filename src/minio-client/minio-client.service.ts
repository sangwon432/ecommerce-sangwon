import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { exBufferedFile } from './file.model';
import * as crypto from 'crypto';

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
        file.mimeType.includes('jpg') ||
        file.mimeType.includes('jpeg') ||
        file.mimeType.includes('png')
      )
    ) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    const temp_filename = Date.now().toString();
    const hasHashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');

    const ext = file.originalName.substring(
      file.originalName.lastIndexOf('.'),
      file.originalName.length,
    );

    const metaData = {
      'Content-Type': file.mimeType,
      'X-Amz-Meta-Testing': 1234,
    };

    const filename = hasHashedFileName + ext;
    const fileBuffer = file.buffer;

    const userFolderPath = `profile/${userId}`;
    const filePath = `${userFolderPath}${filename}`;

    this.client.putObject(
      baseBucket,
      filePath,
      fileBuffer,
      fileBuffer.length,
      metaData,
      function (err) {
        if (err) {
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    return {
      url: `http://${this.configService.get(
        'MINIO_ENDPOINT',
      )}}:${this.configService.get('MINIO_PORT')}/${this.configService.get(
        'MINIO_BUCKET',
      )}/${filePath}`,
    };
  }
}
