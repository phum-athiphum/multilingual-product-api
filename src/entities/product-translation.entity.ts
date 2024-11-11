import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Language } from './language.entity';

@Entity()
export class ProductTranslation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  language_id: string;

  @ManyToOne(() => Product, (product) => product.translations)
  product: Product;

  @ManyToOne(() => Language, (language) => language.translations)
  language: Language;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
