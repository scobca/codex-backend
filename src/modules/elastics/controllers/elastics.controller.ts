import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ElasticsProvider } from '../providers/elastics.provider';

@Controller('/elastic')
export class ElasticsController {
  constructor(
    @Inject(ElasticsProvider)
    private readonly elasticsProvider: ElasticsProvider,
  ) {}

  @Get('/getAll')
  async getAll() {
    return await this.elasticsProvider.getAll();
  }

  @Get('/getOne:id')
  async getOne(@Param('id') id: number) {
    return await this.elasticsProvider.getOne(id);
  }

  @Get('/getAllElastics')
  async getAllElastics() {
    return await this.elasticsProvider.getAllElastics();
  }
}
