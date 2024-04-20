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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cache_1 = require("@nestjs/common/cache");
const bcrypt = require("bcryptjs");
const cache_manager_1 = require("cache-manager");
const schedule_1 = require("@nestjs/schedule");
const user_entity_1 = require("./entities/user.entity");
const minio_client_service_1 = require("../minio-client/minio-client.service");
const email_service_1 = require("../email/email.service");
let UserService = class UserService {
    constructor(userRepository, cacheManager, minioClientService, emailService) {
        this.userRepository = userRepository;
        this.cacheManager = cacheManager;
        this.minioClientService = minioClientService;
        this.emailService = emailService;
    }
    async getAllUserInfo() {
        return await this.userRepository.find();
    }
    async createUser(createUserDto) {
        const newUser = await this.userRepository.create(createUserDto);
        await this.userRepository.save(newUser);
        return newUser;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOneBy({ email });
        if (user)
            return user;
        throw new common_1.HttpException('no user', common_1.HttpStatus.NOT_FOUND);
    }
    async getUserById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (user)
            return user;
        throw new common_1.HttpException('no user', common_1.HttpStatus.NOT_FOUND);
    }
    async setCurrentRefreshTokenToRedis(refreshToken, userId) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.cacheManager.set(userId, currentHashedRefreshToken);
    }
    async removeRefreshTokenFromRedis(userId) {
        await this.cacheManager.del(userId);
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        const user = await this.getUserById(userId);
        const getUserIdFromRedis = await this.cacheManager.get(userId);
        const isRefreshTokenMatched = await bcrypt.compare(refreshToken, getUserIdFromRedis);
        if (isRefreshTokenMatched)
            return user;
    }
    async changePassword(email, password) {
        const saltValue = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, saltValue);
        return await this.userRepository.update({ email }, { password: newPassword });
    }
    async updateProfileFromToken(user, updateUserDto, profileImg) {
        console.log(profileImg);
        const uploaded_image = await this.minioClientService.uploadProfileImg(user.id, profileImg);
        return await this.userRepository.update(user.id, {
            ...updateUserDto,
            profileImg: `${uploaded_image.url}`,
        });
    }
    async deleteUser(user) {
        return await this.userRepository.update(user.id, {
            isDeleted: true,
            deleteRequestedAt: new Date(),
        });
    }
    async cancelDeleteUserRequest(user) {
        return await this.userRepository.update(user.id, {
            isDeleted: false,
            deleteRequestedAt: null,
        });
    }
    async removeDeleteUser() {
        const deletionThreshold = new Date();
        deletionThreshold.setDate(deletionThreshold.getDate());
        await this.userRepository.delete({
            isDeleted: true,
            deleteRequestedAt: (0, typeorm_2.LessThan)(deletionThreshold),
        });
    }
    async updateUserInfo(user, info) {
        const existedUser = await this.userRepository.findOneBy({
            id: user.id,
        });
        if (!existedUser)
            throw new Error('User not found');
        if (this.isProfile(info)) {
            existedUser.profile = info;
        }
        else if (this.isEducation(info)) {
            existedUser.education = info;
        }
        else if (this.isSelfIntroduction(info)) {
            existedUser.selfIntroduction = info;
        }
        return await this.userRepository.save(existedUser);
    }
    isProfile(info) {
        return info.mbti !== undefined;
    }
    isEducation(info) {
        return info.highschoolName !== undefined;
    }
    isSelfIntroduction(info) {
        return info.interests !== undefined;
    }
};
exports.UserService = UserService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserService.prototype, "removeDeleteUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)(cache_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object, minio_client_service_1.MinioClientService,
        email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map