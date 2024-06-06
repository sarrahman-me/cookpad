import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredients } from './ingredients.model';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredients)
    private readonly ingredientModel: typeof Ingredients,
  ) {}

  /**
   * Mendapatkan data bahan untuk resep tertentu
   * @param slug_receipe primary key dari resep
   * @returns data bahan terkait
   */
  async findAllByReceipe(slug_receipe: string): Promise<Ingredients[]> {
    const data = await this.ingredientModel.findAll({
      where: {
        slug_receipe,
      },
    });

    return data;
  }

  /**
   * Menambahkan data bahan
   * @param param0
   * @returns bahan yang baru ditambahkan
   */
  async add({
    ingredient,
    quantity,
    dose,
    slug_receipe,
  }: Partial<Ingredients>): Promise<Ingredients> {
    if (!ingredient || !quantity || !dose || !slug_receipe) {
      throw new BadRequestException('Data Bahan dan bumbu tidak lengkap');
    }

    const addedData = await this.ingredientModel.create({
      ingredient,
      quantity,
      dose,
      slug_receipe,
    });

    return addedData;
  }

  /**
   * Menghapus data bahan denga id
   * @param id pk
   * @returns
   */
  async delete(id: number): Promise<Ingredients> {
    const existingData = await this.ingredientModel.findByPk(id);

    if (!existingData) {
      throw new BadRequestException('Data bahan tidak ditemukan');
    }

    await this.ingredientModel.destroy({
      where: {
        id,
      },
    });

    return existingData;
  }
}
