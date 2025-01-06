import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyDTO } from '../../dtos/property.dto';
import { Property as PropertyEntity } from '../../typeorm/properties';
import { Like, Repository } from 'typeorm';
import {Query } from 'express-serve-static-core'

@Injectable()
export class PropertiesService {
    constructor(@InjectRepository(PropertyEntity) private readonly propertyRepository: Repository<PropertyEntity>){}

    // GET PROPERTIES
    async getProperties(query: Query): Promise<PropertyEntity[]> {
       const resPerPage = 4
       const currentPage = Number(query.page) || 1
       const skip = resPerPage * (currentPage - 1)

    const keyword = query.keyword
      ? { property_title: Like(`%${query.keyword}%`) }
      : {};
        const properties = this.propertyRepository.find({
            where: keyword,
            take: resPerPage,
            skip: skip
        })
        if(properties) {
            return properties
        } else {
            throw new NotFoundException('No Property Found')
        }
    }

    // ADD PROPERTY
    async uploadProperty(propertyDto: PropertyDTO): Promise<PropertyEntity>{
        const property = this.propertyRepository.create(propertyDto)
        if(property) {
            return this.propertyRepository.save(property)
        } else {
            throw new NotFoundException('No Property Found')
        }
    }

    // GET A PROPERTY
    async getProperty(id: number): Promise<PropertyEntity> {
        const property = await this.propertyRepository.findOneBy({id})
        if(property){
            return property;
        } else {
            throw new NotFoundException('No record Found')
        }
    }
    
    async updateProperty(id: number, propertyDto: Partial<PropertyEntity>): Promise<PropertyEntity>{
         await this.propertyRepository.update(id, propertyDto)
         const updateProperty = await this.propertyRepository.findOneBy({id})
        if(updateProperty){
           return updateProperty
        } else {
           throw new NotFoundException('No property Found')
        }
    }

    // REMOVE PROPERTY
    async removeProperty(id: number) {
        const result = await this.propertyRepository.delete({id})
        if(result){
            return 'Property Deleted';
        } else {
            throw new NotFoundException('No record Found')
        }
    }
}
