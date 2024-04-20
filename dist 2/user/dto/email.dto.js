"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailDto = void 0;
const openapi = require("@nestjs/swagger");
class EmailDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String } };
    }
}
exports.EmailDto = EmailDto;
//# sourceMappingURL=email.dto.js.map