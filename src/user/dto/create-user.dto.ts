import { Provider } from '../entities/provider.enum';

export class CreateUserDto {
  username: string;
  email: string;
  password?: string;
  provider?: Provider;
  profileImg?: string;
}
