import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ProductTranslation } from './product-translation.entity';

@Entity()
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'short_name' })
  shortName: string;

  @OneToMany(() => ProductTranslation, (translation) => translation.language)
  translations: ProductTranslation[];
}
