import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StorageModel } from './models/storage.model';
import { StorageController } from './controllers/storage.controller';
import { StorageProvider } from './providers/storage.provider';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsController } from './controllers/elastics.controller';
import { ElasticsProvider } from './providers/elastics.provider';

@Module({
  imports: [
    SequelizeModule.forFeature([StorageModel]),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        node: 'http://localhost:9200',
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [StorageController, ElasticsController],
  providers: [StorageProvider, ElasticsProvider],
  exports: [ElasticsearchModule],
})
export class StorageModule {}
