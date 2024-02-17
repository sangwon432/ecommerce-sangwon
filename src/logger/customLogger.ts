import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigService } from '@nestjs/config';
import { getLogLevels } from '../utils/getLogLevels';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private readonly logsService: LoggerService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LoggerService,
  ) {
    const environment = configService.get('NODE_ENV');

    super(context, {
      ...options,
      // logLevels: getLogLevels(environment === 'production'),
      // logLevels: getLogLevels(environment === 'development'),
      logLevels: getLogLevels(false),
    });

    this.logsService = logsService;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'log',
    });
  }
  error(message: string, context?: string, stack?: string) {
    super.error.apply(this, [message, context, stack]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
  verbose(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
}

// @Injectable()
// export class CustomLogger extends ConsoleLogger {
//   private readonly loggerService: LoggerService;
//
//   constructor(
//     context: string,
//     options: ConsoleLoggerOptions,
//     configService: ConfigService,
//     loggerService: LoggerService,
//   ) {
//     const environment = configService.get('NODE_ENV');
//     super(context, {
//       ...options,
//       logLevels: getLogLevels(environment === 'development'),
//     });
//
//     // super(context, {
//     //   ...options,
//     //   // logLevels: getLogLevels(environment === 'production'),
//     //   logLevels: getLogLevels(environment === 'development'),
//     // });
//
//     this.loggerService = loggerService;
//   }
//
//   error(message: string, context?: string, stack?: string) {
//     super.error.apply(this, [message, context, stack]);
//
//     this.loggerService.createLog({
//       message,
//       context,
//       level: 'error',
//     });
//   }
//
//   warn(message: string, context?: string) {
//     super.warn.apply(this, [message, context]);
//
//     this.loggerService.createLog({
//       message,
//       context,
//       level: 'warn',
//     });
//   }
//
//   debug(message: string, context?: string) {
//     super.debug.apply(this, [message, context]);
//
//     this.loggerService.createLog({
//       message,
//       context,
//       level: 'debug',
//     });
//   }
//
//   verbose(message: string, context?: string) {
//     super.debug.apply(this, [message, context]);
//
//     this.loggerService.createLog({
//       message,
//       context,
//       level: 'verbose',
//     });
//   }
// }
