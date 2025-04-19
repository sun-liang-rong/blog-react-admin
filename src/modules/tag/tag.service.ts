import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/tag.entity';
import { Article } from '../../entities/article.entity';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  create(createTagDto: any) {
    return this.tagRepository.save(createTagDto);
  }
  findList() {

  }
  async findAll(page: number, limit: number) {
    return {
      data: await this.tagRepository.find({
        skip: (page - 1) * limit,
        take: limit,
      }),
      total: await this.tagRepository.count()
    }
  }

  findOne(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  update(id: number, updateTagDto: any) {
    return this.tagRepository.update(id, updateTagDto);
  }

  remove(id: number) {
    return this.tagRepository.delete(id);
  }
  findBlog() {
    return this.tagRepository.find();
  }
  async blogTagAndarticle() {
    // 查询所有标签 并把标签关联的文章也查询出来
    const queryBuilder = this.tagRepository.createQueryBuilder('tag');
    
    // 使用leftJoin连接article_tag中间表和article表
    queryBuilder
      .leftJoin('article_tags_tag', 'at', 'at.tagId = tag.id')
      .leftJoin('article', 'a', 'a.id = at.articleId')
      .select([
        'tag.id', 
        'tag.tagName', 
        'tag.tagColor'
      ])
      .addSelect([
        'a.id', 
        'a.title', 
        'a.summary', 
        'a.coverImage'
      ]);
    
    // 获取所有标签及其关联的文章
    const tags = await queryBuilder.getRawMany();
    
    // 处理结果，将文章按标签分组
    const result = [];
    const tagMap = new Map();
    
    tags.forEach(row => {
      const tagId = row.tag_id;
      
      if (!tagMap.has(tagId)) {
        // 创建新的标签对象
        const tag = {
          id: tagId,
          tagName: row.tag_tagName,
          tagColor: row.tag_tagColor,
          articles: []
        };
        
        tagMap.set(tagId, tag);
        result.push(tag);
      }
      
      // 如果文章存在，添加到对应标签的文章列表中
      if (row.a_id) {
        const tag = tagMap.get(tagId);
        
        // 避免重复添加相同的文章
        const articleExists = tag.articles.some(article => article.id === row.a_id);
        
        if (!articleExists) {
          tag.articles.push({
            id: row.a_id,
            title: row.a_title,
            summary: row.a_summary,
            coverImage: row.a_coverImage
          });
        }
      }
    });
    
    return result;
  }
  findTag(id: string) {
    console.log(id);
    // 根据标签ID 把所有这个标签的文章查询出来
    return this.articleRepository.createQueryBuilder('article')
      .leftJoinAndSelect('article.tags', 'tag')
      .where('tag.id = :id', { id })
      .getMany();
  }
}