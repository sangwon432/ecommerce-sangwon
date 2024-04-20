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
exports.Education = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const education_level_enum_1 = require("../../common/enums/education-level.enum");
let Education = class Education extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../../user/entities/user.entity").User }, highschoolName: { required: true, type: () => String }, universityName: { required: true, type: () => String }, fieldOfStudy: { required: true, type: () => [String] }, educationLevel: { required: true, enum: require("../../common/enums/education-level.enum").EducationLevel } };
    }
};
exports.Education = Education;
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.education),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Education.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Education.prototype, "highschoolName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Education.prototype, "universityName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, nullable: true }),
    __metadata("design:type", Array)
], Education.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: education_level_enum_1.EducationLevel,
        default: education_level_enum_1.EducationLevel.highSchoolGraduation,
    }),
    __metadata("design:type", Number)
], Education.prototype, "educationLevel", void 0);
exports.Education = Education = __decorate([
    (0, typeorm_1.Entity)()
], Education);
//# sourceMappingURL=education.entity.js.map