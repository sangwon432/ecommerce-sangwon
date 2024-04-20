import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';
export declare class CustomLogger extends ConsoleLogger {
    private readonly logsService;
    constructor(context: string, options: ConsoleLoggerOptions, configService: ConfigService, logsService: LoggerService);
    log(message: string, context?: string): void;
    error(message: string, context?: string, stack?: string): void;
    warn(message: string, context?: string): void;
    debug(message: string, context?: string): void;
    verbose(message: string, context?: string): void;
}
