import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { SearchProductsDto } from './dtos/search-product.dto';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() product: CreateProductDto) {
    try {
      const response = await this.productService.createProduct(product);
      return {
        message: 'Create Product Success',
        data: response,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create product Controller');
    }
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  async searchProducts(@Query() query: SearchProductsDto) {
    try {
      const { searchTerm, page, pageSize } = query;
      const results = await this.productService.searchProducts(
        searchTerm,
        page,
        pageSize,
      );
      return results;
    } catch (error) {
      throw new HttpException(
        { message: 'Error searching products', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
