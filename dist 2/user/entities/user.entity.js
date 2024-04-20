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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const base_entity_1 = require("../../common/base.entity");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const provider_enum_1 = require("./provider.enum");
const role_enum_1 = require("./role.enum");
const class_transformer_1 = require("class-transformer");
const terms_entity_1 = require("./terms.entity");
const common_1 = require("@nestjs/common");
const profile_entity_1 = require("../../profile/entities/profile.entity");
const education_entity_1 = require("../../education/entities/education.entity");
const self_introduction_entity_1 = require("../../self-introduction/entities/self-introduction.entity");
let User = class User extends base_entity_1.BaseEntity {
    async beforeSaveFunction() {
        try {
            if (this.provider !== provider_enum_1.Provider.LOCAL) {
                return;
            }
            this.profileImg = gravatar.url(this.email, {
                s: '200',
                r: 'pg',
                d: 'mm',
                protocol: 'https',
            });
            const saltValue = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, saltValue);
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException();
        }
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: false, type: () => String }, profileImg: { required: false, type: () => String }, provider: { required: true, enum: require("./provider.enum").Provider }, roles: { required: true, enum: require("./role.enum").Role, isArray: true }, terms: { required: true, type: () => require("./terms.entity").Terms }, profile: { required: true, type: () => require("../../profile/entities/profile.entity").Profile }, education: { required: true, type: () => require("../../education/entities/education.entity").Education }, selfIntroduction: { required: true, type: () => require("../../self-introduction/entities/self-introduction.entity").SelfIntroduction }, isDeleted: { required: false, type: () => Boolean }, deleteRequestedAt: { required: true, type: () => Date } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profileImg", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: provider_enum_1.Provider,
        default: provider_enum_1.Provider.LOCAL,
    }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.Role,
        array: true,
        default: [role_enum_1.Role.USER],
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => terms_entity_1.Terms, {
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", terms_entity_1.Terms)
], User.prototype, "terms", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.Profile, {
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profile_entity_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => education_entity_1.Education, {
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", education_entity_1.Education)
], User.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => self_introduction_entity_1.SelfIntroduction, {
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", self_introduction_entity_1.SelfIntroduction)
], User.prototype, "selfIntroduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "deleteRequestedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "beforeSaveFunction", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map