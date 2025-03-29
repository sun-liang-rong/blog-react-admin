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
  // 博客详情
  @Get('detail')
  findOne(@Query('articleId') id: string) {
    return this.articleService.findOne(+id);
  }
  // 博客首页
  @Get('blogIndex')
  findBlogIndex() {
    return this.articleService.findBlogIndex();
  }
  // 查询首页轮播文章
  @Get('carousel')
  findCarousel() {
    return this.articleService.findCarousel();
  }
  // 上一页 下一页
  @Get('preAndNext')
  findPreAndNext(@Query('id') id: string) {
    return this.articleService.findPreAndNext(+id);
  }
  @Put('edit')
  update(@Body() updateArticleDto: any) {
    return this.articleService.update(updateArticleDto);
  }
  @Delete('delete')
  remove(@Query('articleId') id: string) {
    return this.articleService.remove(+id);
  }
}