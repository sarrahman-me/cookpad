import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Ingredients } from 'src/ingredients/ingredients.model';
import { Steps } from 'src/steps/steps.model';

@Table
export class Receipes extends Model<Receipes> {
  @Unique
  @PrimaryKey
  @Column
  slug: string;

  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  serving: number;

  @Column
  duration: number; // satuan menit

  @Column
  image_url: string; // s3 url

  // relationship

  //? jika resep dihapus maka ingredient dan step terkait akan terhapus

  @HasMany(() => Ingredients)
  ingredients: Ingredients[];

  @HasMany(() => Steps)
  steps: Steps[];
}
