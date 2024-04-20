"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioClientService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_minio_client_1 = require("nestjs-minio-client");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let MinioClientService = class MinioClientService {
    get client() {
        return this.minio.client;
    }
    constructor(minio, configService) {
        this.minio = minio;
        this.configService = configService;
        this.logger = new common_1.Logger('MinioStorageService');
        this.baseBucket = this.configService.get('MINIO_BUCKET');
    }
    async uploadProfileImg(userId, file, baseBucket = this.baseBucket) {
        if (!(file.mimetype.includes('jpg') ||
            file.mimetype.includes('jpeg') ||
            file.mimetype.includes('png'))) {
            throw new common_1.HttpException('Error uploading file', common_1.HttpStatus.BAD_REQUEST);
        }
        const temp_filename = Date.now().toString();
        const hashedFileName = crypto
            .createHash('md5')
            .update(temp_filename)
            .digest('hex');
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };
        const filename = hashedFileName + ext;
        const fileBuffer = file.buffer;
        const userFolderPath = `profile/${userId}/`;
        const filePath = `${userFolderPath}${filename}`;
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
        this.client.putObject(baseBucket, filePath, fileBuffer, fileBuffer.length, metaData, function (err) {
            console.log(err);
            if (err)
                throw new common_1.HttpException('Error uploading file', common_1.HttpStatus.BAD_REQUEST);
        });
        return {
            url: `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/${filePath}`,
        };
    }
    async uploadDicomFile(file, baseBucket = this.baseBucket) {
        const dcmfileFormat = file.mimetype.includes('dcm');
        if (dcmfileFormat) {
            console.log(dcmfileFormat);
            throw new common_1.HttpException('Error uploading file', common_1.HttpStatus.BAD_REQUEST);
        }
        const temp_filename = Date.now().toString();
        const hashedFileName = crypto
            .createHash('md5')
            .update(temp_filename)
            .digest('hex');
        const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };
        const filename = hashedFileName + ext;
        const fileBuffer = file.buffer;
        const userFolderPath = `dcm/`;
        const filePath = `${userFolderPath}${filename}`;
        this.client.putObject(baseBucket, filePath, fileBuffer, fileBuffer.length, metaData, function (err) {
            if (err)
                throw new common_1.HttpException('Error uploading file', common_1.HttpStatus.BAD_REQUEST);
        });
        return {
            url: `${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/${filePath}`,
        };
    }
    async delete(objectName, baseBucket = this.baseBucket) {
        try {
            await this.client.removeObject(baseBucket, objectName);
        }
        catch (err) {
            throw new common_1.HttpException('Oops Something wrong happened', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.MinioClientService = MinioClientService;
exports.MinioClientService = MinioClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_minio_client_1.MinioService,
        config_1.ConfigService])
], MinioClientService);
//# sourceMappingURL=minio-client.service.js.map