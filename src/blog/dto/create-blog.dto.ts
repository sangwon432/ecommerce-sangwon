import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {message: '최소 두 글자 이상'})
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {message: '최수 두 글자 이상'})
  desc: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, {message: '최소 두 글자 이상'})
  category: string;
}
