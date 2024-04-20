"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const common_1 = require("@nestjs/common");
const cache_1 = require("@nestjs/common/cache");
const config_1 = require("@nestjs/config");
const redisStore = require("cache-manager-redis-store");
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (cfg) => ({
                    store: redisStore,
                    host: cfg.get('REDIS_HOST'),
                    port: cfg.get('REDIS_PORT'),
                    ttl: cfg.get('REDIS_TTL'),
                }),
                isGlobal: true,
            }),
        ],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map