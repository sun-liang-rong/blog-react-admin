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

  async findAll(title: string = '', categoryId: number = null, tagIds: number [] = [], page: number, limit: number) {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.tags', 'tag');
    if (title) {
      queryBuilder.andWhere('article.title LIKE :title', { title: `%${title}%` });
    }
    if (categoryId) {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId });
    }
    if (tagIds && tagIds.length > 0) {
      queryBuilder.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }

    queryBuilder
      .skip((page - 1) * limit)
      .take(limit);
    const [articles, total] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount()
    ]);
    return {
      data: articles,
      total
    };
  }

  findOne(id: number) {
    this.articleRepository.update(id, {
      readingNum: () => 'readingNum + 1'
    })
    return this.articleRepository.findOne({
      where: { id },
      relations: ['categories', 'tags'],
    });
  }
  findCarousel() {
    // 随机取三条数据
    return this.articleRepository
     .createQueryBuilder('article')
     .leftJoinAndSelect('article.categories', 'category')
     .leftJoinAndSelect('article.tags', 'tag')
     .orderBy('RAND()')
     .take(3)
     .getMany();
  }
  findArchives() {
    // 按年月分组 并返回数量
    return this.articleRepository
    .createQueryBuilder('article')
    .select('YEAR(article.createTime) AS year')
    .addSelect('MONTH(article.createTime) AS month')
    .addSelect('COUNT(article.id) AS count')
    .groupBy('year')
    .addGroupBy('month')
    .getRawMany();

  }
  findPreAndNext(id: number) {
    let next = this.articleRepository
     .createQueryBuilder('article')
     .where('article.id > :id', { id })
     .orderBy('article.id', 'ASC')
     .getOne();
    let pre = this.articleRepository
     .createQueryBuilder('article')
     .where('article.id < :id', { id })
     .orderBy('article.id', 'DESC')
    .getOne();
    // 如果是最后一条数据
    if (!next) {
      next = this.articleRepository
      .createQueryBuilder('article')
      .orderBy('article.id', 'ASC')
      .getOne();
    }
    // 如果是第一条数据
    if (!pre) {
      pre = this.articleRepository
     .createQueryBuilder('article')
     .orderBy('article.id', 'DESC')
     .getOne();
    }
    return Promise.all([pre, next ])
  }
  async update(updateArticleDto: any) {
    const article = await this.articleRepository.findOne({
      where: {
        id: updateArticleDto.articleId
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
  findBlogIndex() {
    return this.articleRepository
    .createQueryBuilder('article')
    .leftJoinAndSelect('article.categories', 'category')
    .leftJoinAndSelect('article.tags', 'tag')
    .skip(0)
    .take(10)
    .orderBy('article.createTime', 'DESC')
    .getMany();
  }
  remove(id: number) {
    // 删除文章并且删除关联表
    this.articleRepository
    .createQueryBuilder('article')
    .relation(Article, 'categories')
    .of(id)
    .remove(id);
    this.articleRepository
    .createQueryBuilder('article')
    .relation(Article, 'tags')
    .of(id)
    .remove(id);
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

  async findArticlesByCategory(categoryId: number, page: number, limit: number) {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.categories', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .where('category.id = :aa', { categoryId })
      .skip((page - 1) * limit)
      .take(limit);

    const [articles, total] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount()
    ]);

    return {
      data: articles,
      total
    };
  }
}