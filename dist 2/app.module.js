"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const logger_module_1 = require("./logger/logger.module");
const Joi = require("@hapi/joi");
const schedule_1 = require("@nestjs/schedule");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const email_module_1 = require("./email/email.module");
const blog_module_1 = require("./blog/blog.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const redis_module_1 = require("./redis/redis.module");
const product_module_1 = require("./product/product.module");
const minio_client_module_1 = require("./minio-client/minio-client.module");
const profile_module_1 = require("./profile/profile.module");
const education_module_1 = require("./education/education.module");
const self_introduction_module_1 = require("./self-introduction/self-introduction.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({
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
                }),
            }),
            schedule_1.ScheduleModule.forRoot(),
            blog_module_1.BlogModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            email_module_1.EmailModule,
            redis_module_1.RedisModule,
            logger_module_1.LoggerModule,
            product_module_1.ProductModule,
            minio_client_module_1.MinioClientModule,
            profile_module_1.ProfileModule,
            education_module_1.EducationModule,
            self_introduction_module_1.SelfIntroductionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map