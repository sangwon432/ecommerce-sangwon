import { DocumentBuilder } from '@nestjs/swagger';
export declare class BaseAPIDoc {
    builder: DocumentBuilder;
    initializeOptions(): Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
}
