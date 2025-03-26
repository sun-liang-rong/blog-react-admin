import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(createTagDto: any) {
    const tag = new Tag();
    tag.name = createTagDto.tagName
    tag.color = createTagDto.tagColor;
    return this.tagRepository.save(tag);
  }

  findAll(page: number, limit: number) {
    return this.tagRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
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
}