import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { StepsService } from './steps.service';
import { Steps } from './steps.model';

interface responseType {
  message: string;
  statusCode: number;
  data: Steps[];
}

@Controller('steps')
export class StepsController {
  constructor(private readonly stepService: StepsService) {}

  @Get('/:slug_receipe')
  async findall(
    @Param('slug_receipe') slug_receipe: string,
  ): Promise<responseType> {
    try {
      const data = await this.stepService.findByReceipe(slug_receipe);

      return {
        message: `Berhasil mendapatkan steps untuk slug receipe ${slug_receipe}`,
        statusCode: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
