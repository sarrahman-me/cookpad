import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReceipesService } from './receipes.service';
import { Receipes } from './receipes.model';
import { PayloadReceipes } from './interface/payloadReceipes';

interface responseType {
  message: string;
  statusCode: number;
  data: Receipes | Receipes[];
  metadata?: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}

@Controller('receipes')
export class ReceipesController {
  constructor(private readonly receipesService: ReceipesService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<responseType> {
    try {
      const { data, metadata } = await this.receipesService.findAll({
        page,
        limit,
      });

      return {
        message: 'Berhasil mendapatkan data resep',
        statusCode: HttpStatus.OK,
        data,
        metadata,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/:slug_receipe')
  async find(
    @Param('slug_receipe') slug_receipe: string,
  ): Promise<responseType> {
    try {
      const data = await this.receipesService.findByPk(slug_receipe);

      return {
        message: 'Berhasil mendapatkan data resep',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async add(
    @Body()
    {
      title,
      receipe_image,
      description,
      duration,
      serving,
      steps,
      ingredients,
    }: PayloadReceipes,
  ): Promise<responseType> {
    try {
      const data = await this.receipesService.add({
        title,
        description,
        duration,
        serving,
        ingredients,
        steps,
        receipe_image,
      });

      return {
        message: 'Berhasil menambahkan data resep',
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:slug_receipe')
  async delete(
    @Param('slug_receipe') slug_receipe: string,
  ): Promise<responseType> {
    try {
      const data = await this.receipesService.delete(slug_receipe);

      return {
        message: 'Berhasil menghapus data resep',
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
