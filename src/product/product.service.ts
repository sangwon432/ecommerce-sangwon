import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

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
  async getProducts() {
    return await this.productRepository.find();
  }

  // 상세 제품을 가져오는 로직
  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) return product;
    throw new HttpException('no product', HttpStatus.NOT_FOUND);
  }
}
