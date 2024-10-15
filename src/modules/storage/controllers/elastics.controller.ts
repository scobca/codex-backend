import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ElasticsProvider } from '../providers/elastics.provider';

@Controller('/elastic')
export class ElasticsController {
  constructor(
    @Inject(ElasticsProvider)
    private readonly elasticsProvider: ElasticsProvider,
  ) {}
  @Post('/getAll')
  async getAll(@Body() body: { index: string }) {
    return await this.elasticsProvider.getAllDocuments(body.index);
  }
}
