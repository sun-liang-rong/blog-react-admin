import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: any) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('size') limit: number) {
    return this.tagService.findAll(page, limit);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateTagDto: any) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
  @Get('blogIndex')
  findBlog() {
    return this.tagService.findBlog();
  }
  @Get('blogTagAndarticle')
  blogTagAndarticle() {
    return this.tagService.blogTagAndarticle();
  }
  @Get('findTag')
  findTag(@Query('id') id: string) {
    console.log(id, '------------');
    return this.tagService.findTag(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }
  
}