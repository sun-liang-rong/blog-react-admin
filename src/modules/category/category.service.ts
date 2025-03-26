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
  findAllList() {
    return this.categoryRepository.find(); 
  }
  create(createCategoryDto: any) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll(page: number, limit: number) {
    return this.categoryRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
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