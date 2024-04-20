"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLoggerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_logger_dto_1 = require("./create-logger.dto");
class UpdateLoggerDto extends (0, swagger_1.PartialType)(create_logger_dto_1.CreateLoggerDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateLoggerDto = UpdateLoggerDto;
//# sourceMappingURL=update-logger.dto.js.map