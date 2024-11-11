import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchProductsDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Page must be at least 1' })
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'PageSize must be at least 1' })
  pageSize: number;
}
