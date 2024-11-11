import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 20, { message: 'Name must be between 1 and 20 characters' })
  name: string;

  @IsString()
  @Length(1, 250, {
    message: 'Description must be between 1 and 250 characters',
  })
  description: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(1000, { message: 'Price must not exceed 1,000' })
  price: number;
}
