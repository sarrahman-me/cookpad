import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredients } from './ingredients.model';

interface responseType {
  message: string;
  statusCode: number;
  data: Ingredients[];
}

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) {}

  @Get('/:slug_receipe')
  async findallByReceipe(
    @Param('slug_receipe') slug_receipe: string,
  ): Promise<responseType> {
    const data = await this.ingredientService.findAllByReceipe(slug_receipe);

    return {
      message: 'Berhasil mendapatkan data bahan',
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
