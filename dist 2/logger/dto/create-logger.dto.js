"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLoggerDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateLoggerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { message: { required: true, type: () => String }, context: { required: true, type: () => String }, level: { required: true, type: () => String } };
    }
}
exports.CreateLoggerDto = CreateLoggerDto;
//# sourceMappingURL=create-logger.dto.js.map