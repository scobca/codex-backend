import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './providers/app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConf } from '../../config/db.conf';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...dbConf,
      autoLoadModels: true,
      synchronize: true,
    }),
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
