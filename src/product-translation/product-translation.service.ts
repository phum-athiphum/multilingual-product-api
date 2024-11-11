import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTranslation } from 'src/entities/product-translation.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { CreateProductTranslationDto } from './dtos/create-product-translation.dto';
import { LanguageService } from 'src/language/language.service';
@Injectable()
export class ProductTranslationService {
  constructor(
    private readonly productService: ProductService,
    private readonly languageService: LanguageService,

    @InjectRepository(ProductTranslation)
    private readonly productTranslationRepository: Repository<ProductTranslation>,
  ) {}

  //   thai id = 2
  //   chinese id = 3
  //   japanese id = 4

  async createProductTranslation(
    productId: string,
    languageCode: string,
    createProductTranslationDto: CreateProductTranslationDto,
  ): Promise<ProductTranslation> {
    // เช็คก่อนว่ามี main product ไหม
    const product = await this.productService.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // เช็คก่อนว่า language id ส่งมมีจริงไหม
    const language = await this.languageService.findByid(languageCode);
    if (!language) {
      throw new NotFoundException(
        `Language with code ${languageCode} not found`,
      );
    }

    // เช๊คว่าตัว translations มันซํ้ารึป่าว
    const existingTranslation = await this.findByProductIdAndLanguageCode(
      productId,
      languageCode,
    );
    if (existingTranslation) {
      throw new ConflictException(
        `Translation already exists for language: ${languageCode}`,
      );
    }

    // create ตัว product translations
    const productTranslation = this.productTranslationRepository.create({
      product,
      language,
      language_id: language.id,
      ...createProductTranslationDto,
    });

    return this.productTranslationRepository.save(productTranslation);
  }

  //   ใช้หาตัว product translations จาก productId กับ languageId
  async findByProductIdAndLanguageCode(
    productId: string,
    languageId: string,
  ): Promise<ProductTranslation | undefined> {
    const productTranslation = await this.productTranslationRepository.findOne({
      where: {
        product: { id: productId },
        language: { id: languageId },
      },
    });

    return productTranslation;
  }
}
