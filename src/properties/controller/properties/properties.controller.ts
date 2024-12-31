import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { PropertyDTO } from 'src/properties/dtos/property.dto';
import { PropertiesService } from 'src/properties/services/properties/properties.service';

import {Query as ExpressQuery} from 'express-serve-static-core'

@Controller('properties')
export class PropertiesController {
 constructor(@Inject('PROPERTIES_SERVICE') private readonly propertiesService: PropertiesService){}


 @Post('add-property')
 @UseInterceptors(FileInterceptor('file'))
 async uploadFile(@Body() propertyDto: PropertyDTO, @UploadedFile() file: Express.Multer.File) {
   const url = `http://localhost:3000/api/property/uploads/${file.filename}`;
   return this.propertiesService.uploadProperty({...propertyDto, url});
 }

 @Get()
 getProperties(@Query() query: ExpressQuery) {
    return this.propertiesService.getProperties(query)
 }

 @Get(':id')
 getProperty(@Param('id') id: number) {
    return this.propertiesService.getProperty(id)
 }

 @Put(':id')
 updateProperty(@Param('id') id: number, @Body() propertyDTO : PropertyDTO) {
    return this.propertiesService.updateProperty(id, propertyDTO)
 }

 @Delete(':id')
 removeProperty(@Param('id') id: number) {
    return this.propertiesService.removeProperty(id)
 }

}
