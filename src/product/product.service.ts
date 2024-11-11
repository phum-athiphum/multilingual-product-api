import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductTranslation } from 'src/entities/product-translation.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private readonly productTranslationRepository: Repository<ProductTranslation>,
  ) {}

  // create ตัว product ตัว main ที่ default ภาษาท่ี่ใช้เป็นภาษาอังกฤษ
  async createProduct(productData: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(productData);

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findById(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return product;
  }

  async searchProducts(searchTerm: string, page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;

    // ถ้ามี searchTerm จะทำการค้นหาจากทั้ง ตัว product และ productTranslation
    if (searchTerm) {
      // ค้นหาใน product โดยตรง
      const mainProducts = await this.productRepository.find({
        where: { name: Like(`%${searchTerm}%`) },
      });

      // ค้นหาใน productTranslation และรวม product หลักที่เชื่อมโยง
      const translations = await this.productTranslationRepository.find({
        where: { name: Like(`%${searchTerm}%`) },
        relations: ['product', 'product.translations'],
      });

      // รวม product ที่ได้จากทั้งสองที่ โดยดึงเฉพาะ product หลักจาก translation
      const products = [
        ...mainProducts,
        ...translations.map((translation) => translation.product),
      ];

      // ลบ product ที่ซ้ำกัน
      const uniqueProducts = Array.from(
        new Set(products.map((product) => product.id)),
      ).map((id) => products.find((product) => product.id === id));

      // ใช้ pagination หลังจากรวมผลลัพธ์
      const paginatedProducts = uniqueProducts.slice(offset, offset + pageSize);

      return {
        products: paginatedProducts,
        total: uniqueProducts.length,
        page: parseInt(page.toString()),
        pageSize: parseInt(pageSize.toString()),
      };
    } else {
      // ถ้าไม่มี searchTerm ให้ดึงข้อมูลทั้งหมดจาก product โดยตรง
      const products = await this.productRepository.find({
        skip: offset,
        take: pageSize,
        relations: ['translations'],
      });

      // นับจำนวนทั้งหมดของ product
      const total = await this.productRepository.count();

      return {
        products,
        total,
        page: parseInt(page.toString()),
        pageSize: parseInt(pageSize.toString()),
      };
    }
  }
}
