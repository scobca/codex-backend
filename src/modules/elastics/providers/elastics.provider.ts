import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { StorageModel } from '../models/storage.model';

@Injectable()
export class ElasticsProvider {
  constructor(
    @Inject(ElasticsearchService) private readonly ess: ElasticsearchService,
  ) {}

  async getAll() {
    return await StorageModel.findAll();
  }

  async getOne(id: number) {
    return await this.ess.search({
      index: 'my_index',
      body: { query: { match: { id: id } } },
    });
  }

  async getAllElastics() {
    const index: string = '';

    return await this.ess.search({
      index,
      body: { query: { match_all: {} } },
    });
  }
}
