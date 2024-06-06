import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Receipes } from './receipes.model';
import { Ingredients } from 'src/ingredients/ingredients.model';
import { Steps } from 'src/steps/steps.model';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { StepsService } from 'src/steps/steps.service';
import { PayloadReceipes } from './interface/payloadReceipes';

@Injectable()
export class ReceipesService {
  constructor(
    @InjectModel(Receipes) private readonly receipeModel: typeof Receipes,

    private readonly ingredientsService: IngredientsService,
    private readonly stepService: StepsService,
  ) {}

  /**
   * Mendapatkan data receipe beserta langkah dan bahan nya
   * @param param0
   * @returns data step dengan pagination
   */
  async findAll({ page, limit }: { page: number; limit: number }): Promise<{
    data: Receipes[];
    metadata: {
      page: number;
      limit: number;
      totalData: number;
      totalPages: number;
    };
  }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.receipeModel.findAndCountAll({
      offset,
      limit,
    });

    // calculate total data and pages
    const totalData = count;
    const totalPages = Math.ceil(totalData / limit);

    return {
      data: rows,
      metadata: {
        limit,
        page,
        totalData,
        totalPages,
      },
    };
  }

  /**
   * mendapatkan detail data resep
   * @param slug_receipe
   * @returns
   */
  async findByPk(slug_receipe: string): Promise<Receipes> {
    const data = await this.receipeModel.findOne({
      where: {
        slug: slug_receipe,
      },
      include: [
        {
          model: Ingredients,
        },
        {
          model: Steps,
        },
      ],
    });

    if (!data) {
      throw new NotFoundException('Data resep tidak ditemukan');
    }

    return data;
  }

  /**
   * Menambahkan receipe baru beserta langkah dan bahan
   * @param param0
   */
  async add({
    title,
    receipe_image,
    description,
    duration,
    serving,
    steps,
    ingredients,
  }: PayloadReceipes): Promise<Receipes> {
    if (!title || !receipe_image) {
      throw new BadRequestException('Data receipe tidak lengkap');
    }

    // format : judul-123
    const slug_receipe = (
      title +
      '-' +
      (Math.random() * 1000).toFixed(0).toString()
    )
      .trim()
      .toLowerCase()
      .replace(/[\W_]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // TODO: menyimpan gambar ke s3 bucket dan generate url

    const new_receipe = await this.receipeModel.create({
      slug: slug_receipe,
      title,
      description,
      duration,
      serving,
      image_url: receipe_image,
    });

    //  menambahkan langkah langkah
    for (const s of steps) {
      await this.stepService.add({
        description: s.description,
        order_step: s.order_step,
        slug_receipe,
      });
    }

    // menambahkan bahan bahan
    for (const i of ingredients) {
      await this.ingredientsService.add({
        ingredient: i.ingredient,
        quantity: i.quantity,
        dose: i.dose,
        slug_receipe,
      });
    }

    return new_receipe;
  }

  /**
   * Menghapus data resep yang ada di sistem
   * @param slug_receipe
   * @returns data yang terhapus
   */
  async delete(slug_receipe: string): Promise<Receipes> {
    try {
      const existingData = await this.findByPk(slug_receipe);

      if (!existingData) {
        throw new BadRequestException('Data resep tidak ditemukan');
      }

      // menghapus data bahan terlebih dahulu
      for (const i of existingData.ingredients) {
        await this.ingredientsService.delete(i.id);
      }

      // menghapus data step terlebih dahulu
      for (const s of existingData.steps) {
        await this.stepService.delete(s.id);
      }

      await this.receipeModel.destroy({
        where: {
          slug: slug_receipe,
        },
      });

      return existingData;
    } catch (error) {
      throw error;
    }
  }
}
