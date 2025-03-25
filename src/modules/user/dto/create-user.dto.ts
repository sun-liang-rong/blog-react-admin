import { IsString, IsUrl, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsUrl()
  avatar: string;

  @IsString()
  bio: string;

  @IsArray()
  socialLinks: Array<{ name: string; url: string }>;

  @IsString()
  slug: string;
}