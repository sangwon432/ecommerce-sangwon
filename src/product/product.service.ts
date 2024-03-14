import {
  Delete,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { CreateBlogDto } from '../blog/dto/create-blog.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // 제품을 등록하는 로직
  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  // 제품을 모두 가져오는 로직
  async getProducts(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    // return await this.productRepository.find();
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    queryBuilder
      .orderBy('product.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  // 상세 제품을 가져오는 로직
  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) return product;
    throw new HttpException('no product', HttpStatus.NOT_FOUND);
  }

  async deleteProductById(productId: string) {
    const deleteResponse = await this.productRepository.delete({
      id: productId,
    });
    if (!deleteResponse.affected) {
      throw new HttpException('no product', HttpStatus.NOT_FOUND);
    }
    return `deleted ${productId}`;
  }

  //상세 제품 데이터 수정하기
  async updateProductById(id: string, updateProductDto: CreateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (updatedProduct) return updatedProduct;
    throw new HttpException('no product', HttpStatus.NOT_FOUND);
  }
}
