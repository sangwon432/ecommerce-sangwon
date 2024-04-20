"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageOptionsDto = void 0;
const openapi = require("@nestjs/swagger");
const order_constants_1 = require("../constants/order.constants");
class PageOptionsDto {
    constructor() {
        this.order = order_constants_1.Order.ASC;
        this.page = 1;
        this.take = 10;
    }
    get skip() {
        return (this.page - 1) * this.take;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { order: { required: false, default: order_constants_1.Order.ASC, enum: require("../constants/order.constants").Order }, page: { required: false, type: () => Number, default: 1 }, take: { required: false, type: () => Number, default: 10 } };
    }
}
exports.PageOptionsDto = PageOptionsDto;
//# sourceMappingURL=page-options.dto.js.map