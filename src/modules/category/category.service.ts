import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async findAllList() {
    return {
      data: await this.categoryRepository.find(),
      total: await this.categoryRepository.count()
    }
  }
  create(createCategoryDto: any) {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(page: number, limit: number) {
    return {
      data: await this.categoryRepository.find({
        skip: (page - 1) * limit,
        take: limit,
      }),
      total: await this.categoryRepository.count()
    }
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  update(id: number, updateCategoryDto: any) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}