import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare function createInfo(statusCode?: number): {
    statusCode: number;
    message: string;
};
export type Response<T> = ReturnType<typeof createInfo> & {
    data: T;
};
export declare class TransformInterceptor<T> implements NestInterceptor<Text, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
