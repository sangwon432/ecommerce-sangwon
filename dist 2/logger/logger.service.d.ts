import { Repository } from 'typeorm';
import { Logger } from './entities/logger.entity';
import { CreateLoggerDto } from './dto/create-logger.dto';
export declare class LoggerService {
    private logsRepository;
    constructor(logsRepository: Repository<Logger>);
    createLog(createLoggerDto: CreateLoggerDto): Promise<Logger>;
}
