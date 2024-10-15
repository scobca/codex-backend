import { Inject, Injectable } from '@nestjs/common';
import { StorageModel } from '../models/storage.model';
import { StorageModelInputDto } from '../dto/storage-model-input.dto';
import { NotExistException } from '../../../exceptions/not-exist.exception';
import { ElasticSearchInputDto } from '../dto/elastic-search-input.dto';
import { ElasticsProvider } from './elastics.provider';
import { CreateNewElasticDto } from '../dto/create-new-elastic.dto';
import { UpdateElasticDocDto } from '../dto/update-elastic-doc.dto';

@Injectable()
export class StorageProvider {
  constructor(@Inject(ElasticsProvider) private ess: ElasticsProvider) {}

  async getAll(): Promise<StorageModel[]> {
    return await StorageModel.findAll();
  }

  async getByID(id: number): Promise<StorageModel | null> {
    return await StorageModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async create(data: StorageModelInputDto): Promise<StorageModel> {
    return await StorageModel.create({
      title: data.title,
      content: data.content,
    }).then((res: StorageModel) => {
      const docBody: CreateNewElasticDto = {
        index: 'storage'.toLowerCase(),
        id: res.id.toString(),
        title: res.title,
        content: res.content,
      };

      this.createDocument(docBody);
      return res;
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
      ).then(() => {
        const updatedData: UpdateElasticDocDto = {
          index: 'storage'.toLowerCase(),
          id: id.toString(),
          body: data,
        };

        this.updateDocument(updatedData);
      });

      return this.getByID(id);
    } else {
      throw new NotExistException('Document with ID', id);
    }
  }
  async findWithES(index: string, query: string) {
    return this.ess.getOne(new ElasticSearchInputDto(), index, query);
  }

  private async createDocument(data: CreateNewElasticDto) {
    return await this.ess.create(data);
  }

  private async updateDocument(data: UpdateElasticDocDto) {
    return await this.ess.update(data);
  }
}
