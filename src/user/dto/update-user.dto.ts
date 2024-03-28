import { Provider } from '../entities/provider.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(2, { message: '최소 두 자리 이상' })
  username: string;

  @IsEmail()
  email: string;

  // profileImg?: string;
}
