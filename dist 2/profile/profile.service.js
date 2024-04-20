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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const profile_entity_1 = require("./entities/profile.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
let ProfileService = class ProfileService {
    constructor(profileRepository, userService) {
        this.profileRepository = profileRepository;
        this.userService = userService;
    }
    async createProfile(user, createProfileDto) {
        const newProfile = await this.profileRepository.create({
            ...createProfileDto,
            user,
        });
        const savedProfile = await this.profileRepository.save(newProfile);
        await this.userService.updateUserInfo(user, savedProfile);
        return newProfile;
    }
    async updateProfile(user, updateProfileDto) {
        return await this.profileRepository.update(user.profile.id, {
            ...updateProfileDto,
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map