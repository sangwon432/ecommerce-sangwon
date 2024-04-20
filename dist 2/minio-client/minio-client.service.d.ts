import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { exBufferedFile } from './file.model';
export declare class MinioClientService {
    private readonly minio;
    private readonly configService;
    private readonly logger;
    private readonly baseBucket;
    get client(): import("minio").Client;
    constructor(minio: MinioService, configService: ConfigService);
    uploadProfileImg(userId: string, file: exBufferedFile, baseBucket?: string): Promise<{
        url: string;
    }>;
    uploadDicomFile(file: exBufferedFile, baseBucket?: string): Promise<{
        url: string;
    }>;
    delete(objectName: string, baseBucket?: string): Promise<void>;
}
