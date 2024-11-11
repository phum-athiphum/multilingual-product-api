import { IsString, Length } from 'class-validator';

export class CreateProductTranslationDto {
  @IsString()
  @Length(1, 20, { message: 'Name must be between 1 and 20 characters' })
  name: string;

  @IsString()
  @Length(1, 250, {
    message: 'Description must be between 1 and 250 characters',
  })
  description: string;
}
