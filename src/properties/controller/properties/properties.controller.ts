import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertyDTO } from '../../../properties/dtos/property.dto';
import { PropertiesService } from '../../../properties/services/properties/properties.service';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { JWTGuard } from '../../../auth/guards/jwt.guard';
import { Role } from '../../../auth/enum/role.enum';
import { Roles } from '../../../auth/decorator/role.decorator';
import { RolesGuard } from '../../../auth/guards/role.guard';

@Controller('properties')
export class PropertiesController {
 constructor(@Inject('PROPERTIES_SERVICE') private readonly propertiesService: PropertiesService){}


 @Post('add-property')
 @Roles(Role.Admin)
 @UseGuards(JWTGuard, RolesGuard)
 @UseInterceptors(FileInterceptor('file'))
 async uploadFile(@Body() propertyDto: PropertyDTO, @UploadedFile() file: Express.Multer.File) {
   const url = `http://localhost:3000/api/property/uploads/${file.filename}`;
   return this.propertiesService.uploadProperty({...propertyDto, url});
 }

 @Get()
 @UseGuards(JWTGuard)
 getProperties(@Query() query: ExpressQuery) {
    return this.propertiesService.getProperties(query)
 }

 @Get(':id')
 getProperty(@Param('id') id: number) {
    return this.propertiesService.getProperty(id)
 }

 @Put(':id')
 @Roles(Role.Admin)
 @UseGuards(JWTGuard, RolesGuard)
 updateProperty(@Param('id') id: number, @Body() propertyDTO : PropertyDTO) {
    return this.propertiesService.updateProperty(id, propertyDTO)
 }

 @Delete(':id')
 @Roles(Role.Admin)
 @UseGuards(JWTGuard, RolesGuard)
 removeProperty(@Param('id') id: number) {
    return this.propertiesService.removeProperty(id)
 }

}
