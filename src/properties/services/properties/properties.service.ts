import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyDTO } from 'src/properties/dtos/property.dto';
import { Property as PropertyEntity } from 'src/properties/typeorm/properties';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {
    constructor(@InjectRepository(PropertyEntity) private readonly propertyRepository: Repository<PropertyEntity>){}

    async uploadProperty(propertyDto: PropertyDTO): Promise<PropertyEntity>{
        const property = this.propertyRepository.create(propertyDto)
        if(property) {
            return this.propertyRepository.save(property)
        } else {
            throw new NotFoundException('No Property Found')
        }
    }

    async getProperties(): Promise<PropertyEntity[]> {
        const properties = this.propertyRepository.find()
        if(properties) {
            return properties
        } else {
            throw new NotFoundException('No Property Found')
        }
    }

    async getProperty(id: number): Promise<PropertyEntity> {
        const property = await this.propertyRepository.findOneBy({id})
        if(property){
            return property;
        } else {
            throw new NotFoundException('No record Found')
        }
    }
    
    async updateProperty(id: number, propertyDto: Partial<PropertyEntity>): Promise<PropertyEntity>{
        const property = await this.propertyRepository.findOne({where: {id}})
        if(!property){
            throw new NotFoundException('Update Failed')
        } else {
            Object.assign(property, propertyDto)
            return this.propertyRepository.save(property)
        }
    }

    async removeProperty(id: number) {
        const property = await this.propertyRepository.findOneBy({id})
        if(property){
            return 'Property Deleted';
        } else {
            throw new NotFoundException('No record Found')
        }
    }
}
