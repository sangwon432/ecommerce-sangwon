import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: '문자열만 허용' })
  @MinLength(8)
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, {
    message: '최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자',
  })
  readonly currentPassword: string;

  @IsString({ message: '문자열만 허용' })
  @MinLength(8)
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, {
    message: '최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자',
  })
  readonly newPassword: string;
}
