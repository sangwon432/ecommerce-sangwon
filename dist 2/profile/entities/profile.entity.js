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
exports.Profile = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/base.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const gender_enum_1 = require("../../common/enums/gender.enum");
const bloodType_enum_1 = require("../../common/enums/bloodType.enum");
const religion_enum_1 = require("../../common/enums/religion.enum");
let Profile = class Profile extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { user: { required: true, type: () => require("../../user/entities/user.entity").User }, gender: { required: true, enum: require("../../common/enums/gender.enum").Gender }, birth: { required: true, type: () => Date }, homeAddress: { required: true, type: () => String }, bloodType: { required: true, enum: require("../../common/enums/bloodType.enum").BloodType }, mbti: { required: true, type: () => String }, isMarried: { required: true, type: () => Boolean }, hasChildren: { required: true, type: () => Boolean }, religion: { required: true, enum: require("../../common/enums/religion.enum").Religion } };
    }
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.profile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: gender_enum_1.Gender,
        default: gender_enum_1.Gender.Man,
    }),
    __metadata("design:type", Number)
], Profile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Profile.prototype, "birth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "homeAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: bloodType_enum_1.BloodType,
        default: bloodType_enum_1.BloodType.Type_B,
    }),
    __metadata("design:type", Number)
], Profile.prototype, "bloodType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "mbti", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Profile.prototype, "isMarried", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Profile.prototype, "hasChildren", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: religion_enum_1.Religion,
        default: religion_enum_1.Religion.Others,
    }),
    __metadata("design:type", Number)
], Profile.prototype, "religion", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)()
], Profile);
//# sourceMappingURL=profile.entity.js.map