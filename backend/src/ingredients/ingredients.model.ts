import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Receipes } from 'src/receipes/receipes.model';

@Table
export class Ingredients extends Model<Ingredients> {
  @Column
  ingredient: string;

  @Column
  quantity: number;

  @Column
  dose: string;

  @ForeignKey(() => Receipes)
  @Column
  slug_receipe: string;

  // relationship

  @BelongsTo(() => Receipes)
  receipes: Receipes;
}
