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
exports.SelfIntroduction = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let SelfIntroduction = class SelfIntroduction extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../../user/entities/user.entity").User }, personality: { required: true, type: () => String }, interests: { required: true, type: () => String }, socialMediaLinks: { required: true, type: () => String } };
    }
};
exports.SelfIntroduction = SelfIntroduction;
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.selfIntroduction),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], SelfIntroduction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SelfIntroduction.prototype, "personality", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SelfIntroduction.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SelfIntroduction.prototype, "socialMediaLinks", void 0);
exports.SelfIntroduction = SelfIntroduction = __decorate([
    (0, typeorm_1.Entity)()
], SelfIntroduction);
//# sourceMappingURL=self-introduction.entity.js.map