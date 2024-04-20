"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerficationDto = void 0;
const openapi = require("@nestjs/swagger");
class EmailVerficationDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, code: { required: true, type: () => String } };
    }
}
exports.EmailVerficationDto = EmailVerficationDto;
//# sourceMappingURL=email-verfication.dto.js.map