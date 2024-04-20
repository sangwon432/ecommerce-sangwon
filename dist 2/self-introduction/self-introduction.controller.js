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
exports.SelfIntroductionController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const self_introduction_service_1 = require("./self-introduction.service");
const access_token_guard_1 = require("../auth/guards/access-token.guard");
const create_self_introduction_dto_1 = require("./dto/create-self-introduction.dto");
let SelfIntroductionController = class SelfIntroductionController {
    constructor(selfIntroductionService) {
        this.selfIntroductionService = selfIntroductionService;
    }
    async createSelfIntroduction(req, createSelfIntroductionDto) {
        return await this.selfIntroductionService.createSelfIntroduction(req.user, createSelfIntroductionDto);
    }
    async updateSelfIntroduction(req, updateSelfIntroductionDto) {
        return await this.selfIntroductionService.updateSelfIntroduction(req.user, updateSelfIntroductionDto);
    }
    async getSelfIntroductionInfo(req) {
        return req.user.selfIntroduction;
    }
};
exports.SelfIntroductionController = SelfIntroductionController;
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/self-introduction.entity").SelfIntroduction }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_self_introduction_dto_1.CreateSelfIntroductionDto]),
    __metadata("design:returntype", Promise)
], SelfIntroductionController.prototype, "createSelfIntroduction", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Put)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_self_introduction_dto_1.CreateSelfIntroductionDto]),
    __metadata("design:returntype", Promise)
], SelfIntroductionController.prototype, "updateSelfIntroduction", null);
__decorate([
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: require("./entities/self-introduction.entity").SelfIntroduction }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SelfIntroductionController.prototype, "getSelfIntroductionInfo", null);
exports.SelfIntroductionController = SelfIntroductionController = __decorate([
    (0, common_1.Controller)('self-introduction'),
    __metadata("design:paramtypes", [self_introduction_service_1.SelfIntroductionService])
], SelfIntroductionController);
//# sourceMappingURL=self-introduction.controller.js.map