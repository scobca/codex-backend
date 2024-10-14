import { Module } from '@nestjs/common';
import { ElasticsController } from './controllers/elastics.controller';
import { ElasticsProvider } from './providers/elastics.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { StorageModel } from './models/storage.model';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  controllers: [ElasticsController],
  providers: [ElasticsProvider],
  exports: [ElasticsearchModule],
})
export class ElasticsModule {}
