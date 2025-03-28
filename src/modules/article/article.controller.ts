import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  create(@Body() createArticleDto: any) {
    return this.articleService.create(createArticleDto);
  }

  @Post()
  findAll(@Body('title') title: string, @Body('categoryId') categoryId: number,@Body('tagIds') tagIds: number [], @Body('page') page: number, @Body('size') limit: number) {
    return this.articleService.findAll(title, categoryId, tagIds, page, limit);
  }

  @Post('category')
  findByCategory(
    @Body('categoryId') categoryId: number,
    @Body('page') page: number,
    @Body('size') limit: number,
  ) {
    return this.articleService.findArticlesByCategory(categoryId, page, limit);
  }

  @Get('detail')
  findOne(@Query('articleId') id: string) {
    return this.articleService.findOne(+id);
  }

  @Put(':id')
  update(@Body() updateArticleDto: any) {
    return this.articleService.update(updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}