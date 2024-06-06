import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Steps } from './steps/steps.model';
import { StepsModule } from './steps/steps.module';
import { Ingredients } from './ingredients/ingredients.model';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ReceipesModule } from './receipes/receipes.module';
import { Receipes } from './receipes/receipes.model';

@Module({
  imports: [
    /**
     * module configuration .env
     */
    ConfigModule.forRoot(),

    /**
     * ORM Sequelize
     */
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'cookpad',
      models: [Steps, Ingredients, Receipes],
      autoLoadModels: true,
    }),

    /**
     * rate limiter
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute (60000 milliseconds)
        limit: 60, // 60 requests per ttl (1 minute)
      },
    ]),

    /**
     * Other modules
     */
    StepsModule,
    IngredientsModule,
    ReceipesModule,
  ],
  providers: [
    /**
     * global rate limiter configuration
     */
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
