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
    return this.tagRepository.save(createTagDto);
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
}