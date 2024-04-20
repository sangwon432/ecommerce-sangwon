"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSelfIntroductionDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateSelfIntroductionDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { personality: { required: true, type: () => String }, interests: { required: true, type: () => String }, socialMediaLinks: { required: true, type: () => String } };
    }
}
exports.CreateSelfIntroductionDto = CreateSelfIntroductionDto;
//# sourceMappingURL=create-self-introduction.dto.js.map