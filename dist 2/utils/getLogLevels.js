"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogLevels = void 0;
function getLogLevels(isProduction) {
    if (isProduction) {
        return ['log', 'warn', 'error'];
    }
    return ['error', 'warn', 'log', 'verbose', 'debug'];
}
exports.getLogLevels = getLogLevels;
//# sourceMappingURL=getLogLevels.js.map