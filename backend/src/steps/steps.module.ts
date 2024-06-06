import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Steps } from './steps.model';
import { StepsService } from './steps.service';
import { StepsController } from './steps.controller';

@Module({
  imports: [SequelizeModule.forFeature([Steps])],
  providers: [StepsService],
  controllers: [StepsController],
  exports: [StepsService],
})
export class StepsModule {}
