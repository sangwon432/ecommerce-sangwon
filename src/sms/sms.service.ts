import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';

@Injectable()
export class SmsService {
  private readonly twilioClient: Twilio;
  private readonly logger = new Logger(SmsService.name);
  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async initiatePhoneNumberVerification(
    phoneNumber: string,
  ): Promise<VerificationInstance> {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );

    const result = await this.twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });

    console.log('++++++++++++++', result.valid);

    if (result.status === 'denied') {
      console.log('Verification failed');
    }
    return result;
  }
}
