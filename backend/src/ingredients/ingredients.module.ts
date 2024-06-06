import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredients } from './ingredients.model';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';

@Module({
  imports: [SequelizeModule.forFeature([Ingredients])],
  providers: [IngredientsService],
  controllers: [IngredientsController],
  exports: [IngredientsService],
})
export class IngredientsModule {}
