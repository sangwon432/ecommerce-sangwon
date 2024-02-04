import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('create')
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.createBlog(createBlogDto);
  }

  // 전체 블로그 데이터 가져오기
  @Get('all')
  async getBlogs() {
    return await this.blogService.getBlogData();
  }

  // 상세 블로그 내용 가져오기
  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return await this.blogService.getBlogById(id);
  }

  // 상세 블로그 삭제하기
  @Delete(':id')
  async deleteBlogById(@Param('id') id: string) {
    return await this.blogService.deleteBlogById(id);
  }

  //상세 블로그 수정하기
  @Patch(':id')
  async updateBlogById(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
  ) {
    return await this.blogService.updateBlogById(id, updateBlogDto);
  }
}
