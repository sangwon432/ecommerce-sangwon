import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly configService;
    private nodemailerTransport;
    constructor(configService: ConfigService);
    sendMail(options: Mail.Options): Promise<any>;
}
