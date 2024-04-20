"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileDto = void 0;
const openapi = require("@nestjs/swagger");
class UpdateProfileDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { gender: { required: true, enum: require("../../common/enums/gender.enum").Gender }, birth: { required: true, type: () => Date }, homeAddress: { required: true, type: () => String }, bloodType: { required: true, enum: require("../../common/enums/bloodType.enum").BloodType }, mbti: { required: true, type: () => String } };
    }
}
exports.UpdateProfileDto = UpdateProfileDto;
//# sourceMappingURL=update-profile.dto.js.map