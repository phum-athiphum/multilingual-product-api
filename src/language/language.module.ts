import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  exports: [LanguageService],
  providers: [LanguageService],
})
export class LanguageModule {}
