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
exports.EducationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const education_entity_1 = require("./entities/education.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
let EducationService = class EducationService {
    constructor(educationRepository, userService) {
        this.educationRepository = educationRepository;
        this.userService = userService;
    }
    async createEducation(user, createEducationDto) {
        const newEducation = await this.educationRepository.create({
            ...createEducationDto,
            user,
        });
        const savedEducation = await this.educationRepository.save(newEducation);
        await this.userService.updateUserInfo(user, savedEducation);
        return newEducation;
    }
    async updateEducation(user, updateEducationDto) {
        return await this.educationRepository.update(user.education.id, {
            ...updateEducationDto,
        });
    }
};
exports.EducationService = EducationService;
exports.EducationService = EducationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(education_entity_1.Education)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], EducationService);
//# sourceMappingURL=education.service.js.map