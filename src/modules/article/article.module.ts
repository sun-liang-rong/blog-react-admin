import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Category } from '../../entities/category.entity';
import { Tag } from '../../entities/tag.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Article, Category, Tag])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}