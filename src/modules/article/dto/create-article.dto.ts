import { IsString, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @IsArray()
  @IsOptional()
  categoryIds?: number[];

  @IsArray()
  @IsOptional()
  tagIds?: number[];

  @IsString()
  slug: string;
}