import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProductTranslationDto } from './dtos/create-product-translation.dto';
import { ProductTranslationService } from './product-translation.service';

@Controller('product-translation')
export class ProductTranslationController {
  constructor(private productTranslationsService: ProductTranslationService) {}
  @Post(':productId/translations/:languageId')
  @HttpCode(HttpStatus.CREATED)
  async createProductTranslation(
    @Param('productId') productId: string,
    @Param('languageId') languageId: string,
    @Body() createProductTranslationDto: CreateProductTranslationDto,
  ) {
    try {
      const product =
        await this.productTranslationsService.createProductTranslation(
          productId,
          languageId,
          createProductTranslationDto,
        );
      return {
        message: 'Create Product Translation Success',
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Error creating product translation', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
