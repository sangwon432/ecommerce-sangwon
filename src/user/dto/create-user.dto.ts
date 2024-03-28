import { Provider } from '../entities/provider.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: '최소 두 자리 이상' })
  username?: string;

  @IsEmail()
  email?: string;

  @IsString({ message: '문자열만 허용' })
  @MinLength(8)
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, {
    message: '최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자',
  })
  password?: string;
  provider?: Provider;
  profileImg?: string;
}
