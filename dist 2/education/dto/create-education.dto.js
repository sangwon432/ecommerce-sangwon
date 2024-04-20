"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEducationDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateEducationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { highschoolName: { required: true, type: () => String }, universityName: { required: true, type: () => String }, fieldOfStudy: { required: true, type: () => [String] }, educationLevel: { required: true, enum: require("../../common/enums/education-level.enum").EducationLevel } };
    }
}
exports.CreateEducationDto = CreateEducationDto;
//# sourceMappingURL=create-education.dto.js.map