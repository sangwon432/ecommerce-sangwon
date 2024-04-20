import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class LoggerInterceptor implements NestInterceptor {
    private logger;
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
