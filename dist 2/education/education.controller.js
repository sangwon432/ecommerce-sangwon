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
exports.EducationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const education_service_1 = require("./education.service");
const access_token_guard_1 = require("../auth/guards/access-token.guard");
const create_education_dto_1 = require("./dto/create-education.dto");
let EducationController = class EducationController {
    constructor(educationService) {
        this.educationService = educationService;
    }
    async createEducation(req, createEducationDto) {
        return await this.educationService.createEducation(req.user, createEducationDto);
    }
    async updateEducation(req, updateEducationDto) {
        return await this.educationService.updateEducation(req.user, updateEducationDto);
    }
};
exports.EducationController = EducationController;
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/education.entity").Education }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_education_dto_1.CreateEducationDto]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "createEducation", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_education_dto_1.CreateEducationDto]),
    __metadata("design:returntype", Promise)
], EducationController.prototype, "updateEducation", null);
exports.EducationController = EducationController = __decorate([
    (0, common_1.Controller)('education'),
    __metadata("design:paramtypes", [education_service_1.EducationService])
], EducationController);
//# sourceMappingURL=education.controller.js.map