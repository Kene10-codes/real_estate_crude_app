import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'node:querystring';
import { SignUpDto } from 'src/customers/dtos/signup.dto';
import { Customer as CustomerEntity} from 'src/customers/typeorm/customer';
import { encodePassword } from 'src/customers/util/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
     

    constructor(@InjectRepository(CustomerEntity) private readonly customerReposity: Repository<CustomerEntity>){}


    async signupCustomer(customerDto: SignUpDto){
        const {email} = customerDto
       const  password = await encodePassword(customerDto.password)
       const customer =  this.customerReposity.create({...customerDto, password})
       if(customer) {
        const isCustomer = await this.customerReposity.findOneBy({email})
        console.log(isCustomer)
        //  return this.customerReposity.save(customer)
       } else {
        throw new BadRequestException()
       }
              
    }
}
