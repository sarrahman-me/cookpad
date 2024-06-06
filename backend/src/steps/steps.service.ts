import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Steps } from './steps.model';

@Injectable()
export class StepsService {
  constructor(
    @InjectModel(Steps)
    private readonly modelSteps: typeof Steps,
  ) {}

  /**
   * Menambahkan data step baru
   * @param param0
   * @returns step yang baru ditambahkan
   */
  async add({
    description,
    order_step,
    slug_receipe,
  }: Partial<Steps>): Promise<Steps> {
    if (!description || !order_step || !slug_receipe) {
      throw new BadRequestException('Data langkah pembuatan tidak lengkap');
    }

    const addedData = await this.modelSteps.create({
      description,
      order_step,
      slug_receipe,
    });

    return addedData;
  }

  /**
   * Mendapatkan semua data step utuk resep tertentu
   * @param slug_receipe primary key dari step
   * @returns semua data step terkait
   */
  async findByReceipe(slug_receipe: string): Promise<Steps[]> {
    const data = await this.modelSteps.findAll({
      where: {
        slug_receipe,
      },
    });

    return data;
  }

  /**
   * Menghapus data tahapan denga id
   * @param id pk
   * @returns
   */
  async delete(id: number): Promise<Steps> {
    const existingData = await this.modelSteps.findByPk(id);

    if (!existingData) {
      throw new BadRequestException('Data tahapan tidak ditemukan');
    }

    await this.modelSteps.destroy({
      where: {
        id,
      },
    });

    return existingData;
  }
}
