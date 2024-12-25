import { Module } from '@nestjs/common';
import { PropertiesService } from './services/properties/properties.service';
import { PropertiesController } from './controller/properties/properties.controller';

@Module({
  providers: [PropertiesService],
  controllers: [PropertiesController]
})
export class PropertiesModule {}
