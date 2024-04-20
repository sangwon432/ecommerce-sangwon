"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEducationDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_education_dto_1 = require("./create-education.dto");
class UpdateEducationDto extends (0, swagger_1.PartialType)(create_education_dto_1.CreateEducationDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEducationDto = UpdateEducationDto;
//# sourceMappingURL=update-education.dto.js.map