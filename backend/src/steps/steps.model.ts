import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Receipes } from 'src/receipes/receipes.model';

@Table
export class Steps extends Model<Steps> {
  @Column
  description: string;

  @Column
  order_step: number;

  @ForeignKey(() => Receipes)
  @Column
  slug_receipe: string;

  // relationship

  @BelongsTo(() => Receipes)
  receipes: Receipes;
}
