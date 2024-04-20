"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPIDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseAPIDoc {
    constructor() {
        this.builder = new swagger_1.DocumentBuilder();
    }
    initializeOptions() {
        return this.builder
            .setTitle('Sangwon ECommerce')
            .setDescription('Sangwon ECommerce API Document')
            .addBearerAuth()
            .setVersion('1.0')
            .build();
    }
}
exports.BaseAPIDoc = BaseAPIDoc;
//# sourceMappingURL=swagger.document.js.map