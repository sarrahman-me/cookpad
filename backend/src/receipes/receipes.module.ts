import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Receipes } from './receipes.model';
import { ReceipesService } from './receipes.service';
import { ReceipesController } from './receipes.controller';
import { IngredientsModule } from 'src/ingredients/ingredients.module';
import { StepsModule } from 'src/steps/steps.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Receipes]),
    IngredientsModule,
    StepsModule,
  ],
  providers: [ReceipesService],
  controllers: [ReceipesController],
})
export class ReceipesModule {}
