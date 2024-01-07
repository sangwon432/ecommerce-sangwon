import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  // blog table에 데이터 로직 저장
  async createBlog(createBlogDto: CreateBlogDto) {
    const newBlog = await this.blogRepository.create(createBlogDto);
    await this.blogRepository.save(newBlog);
    return newBlog;
  }

  // 전체 블로그 내용 데이터 가지고 오기
  async getBlogData() {
    const blogs = await this.blogRepository.find();
    return blogs;
  }

  // 상세 블로그 데이터 가지고 오기
  async getBlogById(blogId: string) {
    const blog = await this.blogRepository.findOneBy({ id: blogId });
    if (blog) return blog;
    throw new HttpException('no blog', HttpStatus.NOT_FOUND);
  }

  //상세 블로그 데이터 삭제하기
  async deleteBlogById(blogId: string) {
    const deleteResponse = await this.blogRepository.delete({ id: blogId });
    if (!deleteResponse.affected) {
      throw new HttpException('no blog', HttpStatus.NOT_FOUND);
    }
    return `deleted ${blogId}`;
  }

  //상세 블로그 데이터 수정하기
  async updateBlogById(id: string, updateBlogDto: CreateBlogDto) {
    await this.blogRepository.update(id, updateBlogDto);
    const updatedBlog = await this.blogRepository.findOneBy({ id });
    if (updatedBlog) return updatedBlog;
    throw new HttpException('no blog', HttpStatus.NOT_FOUND);
  }
}
