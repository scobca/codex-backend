import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StorageModel } from './models/storage.model';
import { StorageController } from './controllers/storage.controller';
import { StorageProvider } from './providers/storage.provider';

@Module({
  imports: [SequelizeModule.forFeature([StorageModel])],
  controllers: [StorageController],
  providers: [StorageProvider],
})
export class StorageModule {}
