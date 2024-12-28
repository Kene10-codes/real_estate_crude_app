import { Module } from '@nestjs/common';
import { PropertiesService } from './services/properties/properties.service';
import { PropertiesController } from './controller/properties/properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './typeorm/properties';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),  
    MulterModule.register({
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }),],
  providers: [{
    provide: 'PROPERTIES_SERVICE',
    useClass: PropertiesService
  }],
  controllers: [PropertiesController]
})
export class PropertiesModule {}
