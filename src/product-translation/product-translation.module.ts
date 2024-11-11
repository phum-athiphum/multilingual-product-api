import { Module } from '@nestjs/common';
import { ProductTranslationController } from './product-translation.controller';
import { ProductTranslationService } from './product-translation.service';
import { LanguageModule } from 'src/language/language.module';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslation } from 'src/entities/product-translation.entity';
@Module({
  imports: [
    LanguageModule,
    ProductModule,
    TypeOrmModule.forFeature([ProductTranslation]),
  ],
  controllers: [ProductTranslationController],
  providers: [ProductTranslationService],
})
export class ProductTranslationModule {}
