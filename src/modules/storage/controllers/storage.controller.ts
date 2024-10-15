import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StorageProvider } from '../providers/storage.provider';
import { StorageModelInputDto } from '../dto/storage-model-input.dto';
import { StorageModel } from '../models/storage.model';

@Controller('/storage')
export class StorageController {
  constructor(
    @Inject(StorageProvider) private storageProvider: StorageProvider,
  ) {}

  @Get('/getAll')
  async getAll(): Promise<StorageModel[]> {
    return await this.storageProvider.getAll();
  }

  @Get('/getByIDG/:id')
  async getByIdGet(@Param('id') id: number): Promise<StorageModel> {
    return await this.storageProvider.getByID(id);
  }

  @Post('/getByIDP')
  async getByIdPost(@Body() body: { id: number }): Promise<StorageModel> {
    return await this.storageProvider.getByID(body.id);
  }

  @Post('/create')
  async create(@Body() body: StorageModelInputDto): Promise<StorageModel> {
    return await this.storageProvider.create(body);
  }

  @Delete('/delete')
  async delete(@Body() body: { id: number }): Promise<number> {
    return await this.storageProvider.delete(body.id);
  }

  @Patch('/update')
  async update(
    @Body() body: { id: number; data: Partial<StorageModelInputDto> },
  ): Promise<StorageModel> {
    return await this.storageProvider.update(body.id, body.data);
  }
}
