import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { Product } from './entities/product.entity';
import { CreateBlogDto } from '../blog/dto/create-blog.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 제품 등록하는 API
  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  // 제품을 모두 가지고오는 API
  @Get('all')
  async getProducts(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    return await this.productService.getProducts(pageOptionsDto);
  }

  // 상세 제품 가져오기
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  // 상세 제품 삭제하기
  @Delete(':id')
  async RemoveProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }

  //상세 제품 수정하기
  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }
}
