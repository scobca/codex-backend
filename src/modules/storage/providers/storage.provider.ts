import { Injectable } from '@nestjs/common';
import { StorageModel } from '../models/storage.model';
import { StorageModelInputDto } from '../dto/storage-model-input.dto';
import { DocNotExistException } from '../../../exceptions/doc-not-exist.exception';

@Injectable()
export class StorageProvider {
  async getAll(): Promise<StorageModel[]> {
    return await StorageModel.findAll();
  }

  async getByID(id: number): Promise<StorageModel> {
    return await StorageModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(data: StorageModelInputDto): Promise<StorageModel> {
    return await StorageModel.create({
      where: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async delete(id: number): Promise<number> {
    return await StorageModel.destroy({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    data: Partial<StorageModelInputDto>,
  ): Promise<StorageModel> {
    const document = await this.getByID(id);

    if (document) {
      await StorageModel.update(
        { ...data },
        {
          where: {
            id: id,
          },
        },
      );

      return this.getByID(id);
    } else {
      throw new DocNotExistException('Document with ID: ', id);
    }
  }
}
