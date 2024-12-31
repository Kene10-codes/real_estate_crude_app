import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer as CustomerEntity} from 'src/customers/typeorm/customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
     

    constructor(@InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>){}


    async getCustomers(){
       const customers = await this.customerRepository.find()
       if(!customers) {
        throw new NotFoundException("No user found")
       } else {
        return customers
       }
    }

    async getCustomer(id: number ){
      const customer = await this.customerRepository.findOneBy({id})
      if(customer) {
        return customer
      } else {
        throw new NotFoundException(`Customer with ID ${id} not found!!!`)
      }
    }

    async deleteCustomer(id: any) {
       const customer = await this.customerRepository.delete({id})
       if (customer) {
        return "Customer successfully removed the database"
       } else {
        throw new BadRequestException()
       }
    }

    async updateCustomer(id: number, updateData: Partial<CustomerEntity>): Promise<CustomerEntity> {
      await this.customerRepository.update(id, updateData)
      const updateProperty = await this.customerRepository.findOneBy({id})
     if(updateProperty){
        return updateProperty
     } else {
        throw new NotFoundException('No property Found')
     }
}
}