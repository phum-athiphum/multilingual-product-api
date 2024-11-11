import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from './language/language.module';
import { ProductModule } from './product/product.module';
import { ProductTranslationModule } from './product-translation/product-translation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    LanguageModule,
    ProductModule,
    ProductTranslationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
