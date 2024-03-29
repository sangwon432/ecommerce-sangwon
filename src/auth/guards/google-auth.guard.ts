import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Provider } from '../../user/entities/provider.enum';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(Provider.GOOGLE) {}
