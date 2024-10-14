import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConf } from '../../config/db.conf';
import { ElasticsModule } from '../elastics/elastics.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...dbConf,
      autoLoadModels: true,
      synchronize: true,
    }),
    ElasticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
