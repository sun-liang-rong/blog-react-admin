import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { Category } from '../../entities/category.entity';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(createArticleDto: any) {
    return this.articleRepository.save(createArticleDto);
  }

  findAll(page: number, limit: number) {
    return this.articleRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['categories', 'tags'],
    });
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id },
      relations: ['categories', 'tags'],
    });
  }

  update(id: number, updateArticleDto: any) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  remove(id: number) {
    return this.articleRepository.delete(id);
  }

  async findArticlesWithRelations(page: number, limit: number) {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getMany();
  }
}