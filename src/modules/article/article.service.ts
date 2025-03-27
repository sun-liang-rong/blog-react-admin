import { map } from 'rxjs/operators';
import { Tag } from './../../entities/tag.entity';
import { CategoryService } from './../category/category.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { Category } from '../../entities/category.entity';
import { In } from 'typeorm';
import { ta } from 'element-plus/es/locale';
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

  async create(createArticleDto: any) {
    const category = await this.categoryRepository.find({where: {id: createArticleDto.categoryId}})
    const tag = await this.tagRepository.find({where: {id: In(createArticleDto.tagIds)}})
    const article = new Article();
    article.categories = category;
    article.tags = tag;
    article.content = createArticleDto.content;
    article.title = createArticleDto.title;
    article.summary = createArticleDto.summary;
    article.coverImage = createArticleDto.coverImage;
    article.readingNum = 0;
    return this.articleRepository.save(article);
  }

  async findAll(page: number, limit: number) {
    return {
      data: await this.articleRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['categories', 'tags'],
      }),
      total: await this.articleRepository.count()
    }
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id },
      relations: ['categories', 'tags'],
    });
  }

  async update(updateArticleDto: any) {
    const article = await this.articleRepository.findOne({
      where: {
        id: updateArticleDto.id
      },
      relations: [
        'categories', 'tags'
      ]
    })
    Object.assign(article, updateArticleDto);
    const category = await this.categoryRepository.find({where: {id: In([updateArticleDto.categoryId])}})
    const tag = await this.tagRepository.find({where: {id: In(updateArticleDto.tagIds)}})
    article.tags = tag;
    article.categories = category
    return this.articleRepository.save(article);
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