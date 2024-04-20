"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfIntroductionModule = void 0;
const common_1 = require("@nestjs/common");
const self_introduction_service_1 = require("./self-introduction.service");
const self_introduction_controller_1 = require("./self-introduction.controller");
const typeorm_1 = require("@nestjs/typeorm");
const self_introduction_entity_1 = require("./entities/self-introduction.entity");
const user_module_1 = require("../user/user.module");
let SelfIntroductionModule = class SelfIntroductionModule {
};
exports.SelfIntroductionModule = SelfIntroductionModule;
exports.SelfIntroductionModule = SelfIntroductionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([self_introduction_entity_1.SelfIntroduction]), user_module_1.UserModule],
        controllers: [self_introduction_controller_1.SelfIntroductionController],
        providers: [self_introduction_service_1.SelfIntroductionService],
    })
], SelfIntroductionModule);
//# sourceMappingURL=self-introduction.module.js.map